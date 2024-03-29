import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-18640bff.js";const i={},l=e(`<p>命名服务是为系统中的资源提供标识能力。ZooKeeper的命名服务主要是利用ZooKeeper节点的树形分层结构和子节点的顺序维护能力，来为分布式系统中的资源命名。</p><p>哪些应用场景需要用到分布式命名服务呢？典型的有：</p><ul><li>分布式API目录</li><li>分布式节点命名</li><li>分布式ID生成器</li></ul><h2 id="分布式api目录" tabindex="-1"><a class="header-anchor" href="#分布式api目录" aria-hidden="true">#</a> 分布式API目录</h2><p>为分布式系统中各种API接口服务的名称、链接地址，提供类似JNDI（Java命名和目录接口）中的文件系统的功能。借助于ZooKeeper的树形分层结构就能提供分布式的API调用功能。</p><p>著名的Dubbo分布式框架就是应用了ZooKeeper的分布式的JNDI功能。在Dubbo中，使用ZooKeeper维护的全局服务接口API的地址列表。大致的思路为：</p><ul><li>服务提供者（Service Provider）在启动的时候，向ZooKeeper上的指定节点/dubbo/\${serviceName}/providers写入自己的API地址，这个操作就相当于服务的公开。</li><li>服务消费者（Consumer）启动的时候，订阅节点/dubbo/{serviceName}/providers下的服务提供者的URL地址，获得所有服务提供者的API。</li></ul><p>​ <img src="https://img.jssjqd.cn/202306240004463.png" alt="image-20230624000450554" loading="lazy"></p><h2 id="分布式节点的命名" tabindex="-1"><a class="header-anchor" href="#分布式节点的命名" aria-hidden="true">#</a> 分布式节点的命名</h2><p>一个分布式系统通常会由很多的节点组成，节点的数量不是固定的，而是不断动态变化的。比如说，当业务不断膨胀和流量洪峰到来时，大量的节点可能会动态加入到集群中。而一旦流量洪峰过去了，就需要下线大量的节点。再比如说，由于机器或者网络的原因，一些节点会主动离开集群。</p><p>如何为大量的动态节点命名呢？一种简单的办法是可以通过配置文件，手动为每一个节点命名。但是，如果节点数据量太大，或者说变动频繁，手动命名则是不现实的，这就需要用到分布式节点的命名服务。</p><p>可用于生成集群节点的编号的方案：</p><p>（1）使用数据库的自增ID特性，用数据表存储机器的MAC地址或者IP来维护。</p><p>（2）使用ZooKeeper持久顺序节点的顺序特性来维护节点的NodeId编号。</p><p>在第2种方案中，集群节点命名服务的基本流程是：</p><ul><li>启动节点服务，连接ZooKeeper，检查命名服务根节点是否存在，如果不存在，就创建系统的根节点。</li><li>在根节点下创建一个临时顺序ZNode节点，取回ZNode的编号把它作为分布式系统中节点的NODEID。</li><li>如果临时节点太多，可以根据需要删除临时顺序ZNode节点。</li></ul><h2 id="分布式的id生成器" tabindex="-1"><a class="header-anchor" href="#分布式的id生成器" aria-hidden="true">#</a> 分布式的ID生成器</h2><p>在分布式系统中，分布式ID生成器的使用场景非常之多：</p><ul><li>大量的数据记录，需要分布式ID。</li><li>大量的系统消息，需要分布式ID。</li><li>大量的请求日志，如restful的操作记录，需要唯一标识，以便进行后续的用户行为分析和调用链路分析。</li><li>分布式节点的命名服务，往往也需要分布式ID。</li><li>。。。</li></ul><p>传统的数据库自增主键已经不能满足需求。在分布式系统环境中，迫切需要一种全新的唯一ID系统，这种系统需要满足以下需求：</p><p>（1）全局唯一：不能出现重复ID。</p><p>（2）高可用：ID生成系统是基础系统，被许多关键系统调用，一旦宕机，就会造成严重影响。</p><p>有哪些分布式的ID生成器方案呢？大致如下：</p><ol><li>Java的UUID。</li><li>分布式缓存Redis生成ID：利用Redis的原子操作INCR和INCRBY，生成全局唯一的ID。</li><li>Twitter的SnowFlake算法。</li><li>ZooKeeper生成ID：利用ZooKeeper的顺序节点，生成全局唯一的ID。</li><li>MongoDb的ObjectId:MongoDB是一个分布式的非结构化NoSQL数据库，每插入一条记录会自动生成全局唯一的一个“_id”字段值，它是一个12字节的字符串，可以作为分布式系统中全局唯一的ID。</li></ol><h3 id="基于zookeeper实现分布式id生成器" tabindex="-1"><a class="header-anchor" href="#基于zookeeper实现分布式id生成器" aria-hidden="true">#</a> 基于Zookeeper实现分布式ID生成器</h3><p>在ZooKeeper节点的四种类型中，其中有以下两种类型具备自动编号的能力</p><ul><li>PERSISTENT_SEQUENTIAL持久化顺序节点。</li><li>EPHEMERAL_SEQUENTIAL临时顺序节点。</li></ul><p>ZooKeeper的每一个节点都会为它的第一级子节点维护一份顺序编号，会记录每个子节点创建的先后顺序，这个顺序编号是分布式同步的，也是全局唯一的。</p><p>可以通过创建ZooKeeper的临时顺序节点的方法，生成全局唯一的ID</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IDMaker</span> <span class="token keyword">extends</span> <span class="token class-name">CuratorBaseOperations</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">createSeqNode</span><span class="token punctuation">(</span><span class="token class-name">String</span> pathPefix<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">CuratorFramework</span> curatorFramework <span class="token operator">=</span> <span class="token function">getCuratorFramework</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//创建一个临时顺序节点</span>
        <span class="token class-name">String</span> destPath <span class="token operator">=</span> curatorFramework<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">creatingParentsIfNeeded</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">withMode</span><span class="token punctuation">(</span><span class="token class-name">CreateMode</span><span class="token punctuation">.</span><span class="token constant">EPHEMERAL_SEQUENTIAL</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">forPath</span><span class="token punctuation">(</span>pathPefix<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> destPath<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span>  <span class="token function">makeId</span><span class="token punctuation">(</span><span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token function">createSeqNode</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> str<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//获取末尾的序号</span>
            <span class="token keyword">int</span> index <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>index<span class="token operator">&gt;=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                index<span class="token operator">+=</span>path<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> index<span class="token operator">&lt;=</span>str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> str<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> str<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>      
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testMarkId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token class-name">IDMaker</span> idMaker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IDMaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    idMaker<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> pathPrefix <span class="token operator">=</span> <span class="token string">&quot;/idmarker/id-&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">5</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>j<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span>j<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">String</span> id <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    id <span class="token operator">=</span> idMaker<span class="token punctuation">.</span><span class="token function">makeId</span><span class="token punctuation">(</span>pathPrefix<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;{}线程第{}个创建的id为{}&quot;</span><span class="token punctuation">,</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                            j<span class="token punctuation">,</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token string">&quot;thread&quot;</span><span class="token operator">+</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试结果</p><p>​ <img src="https://img.jssjqd.cn/202306240004159.png" alt="image-20230624000455735" loading="lazy"></p><h3 id="基于zookeeper实现snowflakeid算法" tabindex="-1"><a class="header-anchor" href="#基于zookeeper实现snowflakeid算法" aria-hidden="true">#</a> 基于Zookeeper实现SnowFlakeID算法</h3><p>Twitter（推特）的SnowFlake算法是一种著名的分布式服务器用户ID生成算法。SnowFlake算法所生成的ID是一个64bit的长整型数字，如图10-2所示。这个64bit被划分成四个部分，其中后面三个部分分别表示时间戳、工作机器ID、序列号。</p><p>​ <img src="https://img.jssjqd.cn/202306240005815.png" alt="image-20230624000502760" loading="lazy"></p><p>SnowFlakeID的四个部分，具体介绍如下：</p><p>（1）第一位 占用1 bit，其值始终是0，没有实际作用。</p><p>（2）时间戳 占用41 bit，精确到毫秒，总共可以容纳约69年的时间。</p><p>（3）工作机器id占用10 bit，最多可以容纳1024个节点。</p><p>（4）序列号 占用12 bit。这个值在同一毫秒同一节点上从0开始不断累加，最多可以累加到4095。</p><p>在工作节点达到1024顶配的场景下，SnowFlake算法在同一毫秒最多可以生成的ID数量为： 1024 * 4096 =4194304，在绝大多数并发场景下都是够用的。</p><p>SnowFlake算法的优点：</p><ul><li>生成ID时不依赖于数据库，完全在内存生成，高性能和高可用性。</li><li>容量大，每秒可生成几百万个ID。</li><li>ID呈趋势递增，后续插入数据库的索引树时，性能较高。</li></ul><p>SnowFlake算法的缺点：</p><ul><li>依赖于系统时钟的一致性，如果某台机器的系统时钟回拨了，有可能造成ID冲突，或者ID乱序。</li><li>在启动之前，如果这台机器的系统时间回拨过，那么有可能出现ID重复的危险。</li></ul><p>基于zookeeper实现雪花算法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class SnowflakeIdGenerator {

    /**
     * 单例
     */
    public static SnowflakeIdGenerator instance =
            new SnowflakeIdGenerator();


    /**
     * 初始化单例
     *
     * @param workerId 节点Id,最大8091
     * @return the 单例
     */
    public synchronized void init(long workerId) {
        if (workerId &gt; MAX_WORKER_ID) {
            // zk分配的workerId过大
            throw new IllegalArgumentException(&quot;woker Id wrong: &quot; + workerId);
        }
        instance.workerId = workerId;
    }

    private SnowflakeIdGenerator() {

    }


    /**
     * 开始使用该算法的时间为: 2017-01-01 00:00:00
     */
    private static final long START_TIME = 1483200000000L;

    /**
     * worker id 的bit数，最多支持8192个节点
     */
    private static final int WORKER_ID_BITS = 13;

    /**
     * 序列号，支持单节点最高每毫秒的最大ID数1024
     */
    private final static int SEQUENCE_BITS = 10;

    /**
     * 最大的 worker id ，8091
     * -1 的补码（二进制全1）右移13位, 然后取反
     */
    private final static long MAX_WORKER_ID = ~(-1L &lt;&lt; WORKER_ID_BITS);

    /**
     * 最大的序列号，1023
     * -1 的补码（二进制全1）右移10位, 然后取反
     */
    private final static long MAX_SEQUENCE = ~(-1L &lt;&lt; SEQUENCE_BITS);

    /**
     * worker 节点编号的移位
     */
    private final static long WORKER_ID_SHIFT = SEQUENCE_BITS;

    /**
     * 时间戳的移位
     */
    private final static long TIMESTAMP_LEFT_SHIFT = WORKER_ID_BITS + SEQUENCE_BITS;

    /**
     * 该项目的worker 节点 id
     */
    private long workerId;

    /**
     * 上次生成ID的时间戳
     */
    private long lastTimestamp = -1L;

    /**
     * 当前毫秒生成的序列
     */
    private long sequence = 0L;

    /**
     * Next id long.
     *
     * @return the nextId
     */
    public Long nextId() {
        return generateId();
    }

    /**
     * 生成唯一id的具体实现
     */
    private synchronized long generateId() {
        long current = System.currentTimeMillis();

        if (current &lt; lastTimestamp) {
            // 如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过，出现问题返回-1
            return -1;
        }

        if (current == lastTimestamp) {
            // 如果当前生成id的时间还是上次的时间，那么对sequence序列号进行+1
            sequence = (sequence + 1) &amp; MAX_SEQUENCE;

            if (sequence == MAX_SEQUENCE) {
                // 当前毫秒生成的序列数已经大于最大值，那么阻塞到下一个毫秒再获取新的时间戳
                current = this.nextMs(lastTimestamp);
            }
        } else {
            // 当前的时间戳已经是下一个毫秒
            sequence = 0L;
        }

        // 更新上次生成id的时间戳
        lastTimestamp = current;

        // 进行移位操作生成int64的唯一ID

        //时间戳右移动23位
        long time = (current - START_TIME) &lt;&lt; TIMESTAMP_LEFT_SHIFT;

        //workerId 右移动10位
        long workerId = this.workerId &lt;&lt; WORKER_ID_SHIFT;

        return time | workerId | sequence;
    }

    /**
     * 阻塞到下一个毫秒
     */
    private long nextMs(long timeStamp) {
        long current = System.currentTimeMillis();
        while (current &lt;= timeStamp) {
            current = System.currentTimeMillis();
        }
        return current;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>`,50),t=[l];function p(c,o){return s(),a("div",null,t)}const r=n(i,[["render",p],["__file","index.html.vue"]]);export{r as default};
