import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as d,c as e,f as r}from"./app-18640bff.js";const a={},i=r('<h2 id="redis五种基本数据结构" tabindex="-1"><a class="header-anchor" href="#redis五种基本数据结构" aria-hidden="true">#</a> Redis五种基本数据结构</h2><figure><img src="https://img.jssjqd.cn/20221015025636.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><table><thead><tr><th>结构类型</th><th>结构存储的值</th><th>结构的读写能力</th></tr></thead><tbody><tr><td><strong>String 字符串</strong></td><td>可以是字符串、整数或浮点数</td><td>对整个字符串或字符串的一部分进行操作；对整数或浮点数进行自增或自减操作；</td></tr><tr><td><strong>List 列表</strong></td><td>一个链表，链表上的每个节点都包含一个字符串</td><td>对链表的两端进行 push 和 pop 操作，读取单个或多个元素；根据值查找或删除元素；</td></tr><tr><td><strong>Set 集合</strong></td><td>包含字符串的无序集合</td><td>字符串的集合，包含基础的方法有看是否存在添加、获取、删除；还包含计算交集、并集、差集等</td></tr><tr><td><strong>Hash 散列</strong></td><td>包含键值对的无序散列表</td><td>包含方法有添加、获取、删除单个元素</td></tr><tr><td><strong>Zset 有序集合</strong></td><td>和散列一样，用于存储键值对</td><td>字符串成员与浮点数分数之间的有序映射；元素的排列顺序由分数的大小决定；包含方法有添加、获取、删除单个元素以及根据分值范围或成员来获取元素</td></tr></tbody></table><h3 id="string结构" tabindex="-1"><a class="header-anchor" href="#string结构" aria-hidden="true">#</a> String结构</h3><h4 id="命令使用" tabindex="-1"><a class="header-anchor" href="#命令使用" aria-hidden="true">#</a> 命令使用</h4><table><thead><tr><th>命令</th><th>简述</th><th>使用</th></tr></thead><tbody><tr><td>GET</td><td>获取存储在给定键中的值</td><td>GET name</td></tr><tr><td>SET</td><td>设置存储在给定键中的值</td><td>SET name value</td></tr><tr><td>MSET</td><td>批量存储字符串键值对</td><td>MSET key value [key value ...]</td></tr><tr><td>MGET</td><td>批量获取字符串键值</td><td>MGET key [key ...]</td></tr><tr><td>SETNX</td><td>存入一个不存在的字符串键值对</td><td>SETNX key value</td></tr><tr><td>DEL</td><td>删除存储在给定键中的值</td><td>DEL name</td></tr><tr><td>EXPIRE</td><td>设置一个键的过期时间(秒)</td><td>EXPIRE key seconds</td></tr><tr><td>INCR</td><td>将键存储的值加1</td><td>INCR key</td></tr><tr><td>DECR</td><td>将键存储的值减1</td><td>DECR key</td></tr><tr><td>INCRBY</td><td>将键存储的值加上整数</td><td>INCRBY key amount</td></tr><tr><td>DECRBY</td><td>将键存储的值减去整数</td><td>DECRBY key amount</td></tr></tbody></table><h4 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h4><ul><li><strong>缓存</strong>：单值缓存和对象缓存等，经典使用场景，把常用信息，字符串，图片或者视频等信息放到redis中，redis作为缓存层，mysql做持久化层，降低mysql的读写压力。</li><li><strong>计数器</strong>：比如文章阅读量，点赞数等，redis是单线程模型，一个命令执行完才会执行下一个，同时数据可以一步落地到其他的数据源。</li><li><strong>session</strong>：常见方案spring session + redis实现session共享</li><li><strong>分布式系统全局序列号</strong>：redis批量生成序列号提升性能</li><li><strong>分布式锁</strong>：SETNX 返回1代表获取锁成功，返回0代表获取锁失败，执行完业务删除键代表释放锁，加默认超时时间防止程序意外终止导致死锁</li></ul><h3 id="hash结构" tabindex="-1"><a class="header-anchor" href="#hash结构" aria-hidden="true">#</a> Hash结构</h3><p>Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。</p><h4 id="命令使用-1" tabindex="-1"><a class="header-anchor" href="#命令使用-1" aria-hidden="true">#</a> 命令使用</h4><table><thead><tr><th>命令</th><th>简述</th><th>使用</th></tr></thead><tbody><tr><td>HSET</td><td>添加键值对</td><td>HSET hash-key sub-key1 value1</td></tr><tr><td>HGET</td><td>获取指定散列键的值</td><td>HGET hash-key key1</td></tr><tr><td>HGETALL</td><td>获取散列中包含的所有键值对</td><td>HGETALL hash-key</td></tr><tr><td>HDEL</td><td>如果给定键存在于散列中，那么就移除这个键</td><td>HDEL hash-key sub-key1</td></tr><tr><td>HSETNX</td><td>存储一个不存在的哈希表key的键值</td><td>HSET key field value</td></tr><tr><td>HMSET</td><td>在一个哈希表key中存储多个键值对</td><td>HMSET key field value [field value ...]</td></tr><tr><td>HMGET</td><td>批量获取哈希表key中多个field键值</td><td>HMGET key field [field ...]</td></tr><tr><td>HLEN</td><td>返回哈希表key中field的数量</td><td>HLEN key</td></tr><tr><td>HINCRBY</td><td>为哈希表key中field键的值加上增量increment</td><td>HINCRBY key field increment</td></tr></tbody></table><h4 id="应用场景-1" tabindex="-1"><a class="header-anchor" href="#应用场景-1" aria-hidden="true">#</a> 应用场景</h4><ul><li><strong>缓存</strong>： 更直观，相比 string 更节省空间的维护缓存信息，如用户信息，视频信息，电商购物车等。</li></ul><h4 id="hash结构优缺点" tabindex="-1"><a class="header-anchor" href="#hash结构优缺点" aria-hidden="true">#</a> Hash结构优缺点</h4><p><strong>优点</strong></p><ul><li>同类数据归类整合储存，方便数据管理</li><li>相比string操作消耗内存与cpu更小</li><li>相比string储存更节省空间</li></ul><p><strong>缺点</strong></p><ul><li>过期功能不能使用在field上，只能用在key上</li><li>Redis集群架构下不适合大规模使用</li></ul><h3 id="list结构" tabindex="-1"><a class="header-anchor" href="#list结构" aria-hidden="true">#</a> List结构</h3><figure><img src="https://img.jssjqd.cn/20221015035027.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="命令使用-2" tabindex="-1"><a class="header-anchor" href="#命令使用-2" aria-hidden="true">#</a> 命令使用</h4><table><thead><tr><th>命令</th><th>简述</th><th>使用</th></tr></thead><tbody><tr><td>RPUSH</td><td>将给定值推入到列表右端</td><td>RPUSH key value</td></tr><tr><td>LPUSH</td><td>将给定值推入到列表左端</td><td>LPUSH key value</td></tr><tr><td>RPOP</td><td>从列表的右端弹出一个值，并返回被弹出的值</td><td>RPOP key</td></tr><tr><td>LPOP</td><td>从列表的左端弹出一个值，并返回被弹出的值</td><td>LPOP key</td></tr><tr><td>LRANGE</td><td>获取列表在给定范围上的所有值</td><td>LRANGE key 0 -1</td></tr><tr><td>LINDEX</td><td>通过索引获取列表中的元素。可以使用负数下标，以 -x 表示列表的倒数第x个元素</td><td>LINDEX key index</td></tr><tr><td>BLPOP</td><td>移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。</td><td>BLPOP key1 [key2 ] timeout</td></tr><tr><td>BRPOP</td><td>移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。</td><td>BRPOP key1 [key2 ] timeout</td></tr></tbody></table><h4 id="应用场景-2" tabindex="-1"><a class="header-anchor" href="#应用场景-2" aria-hidden="true">#</a> 应用场景</h4><ul><li><p><strong>常用数据结构</strong></p><p>Stack(栈) = LPUSH + LPOP</p><p>Queue(队列）= LPUSH + RPOP</p><p>Blocking MQ(阻塞队列）= LPUSH + BRPOP</p><p>Capped Collection（有限集合）=LPUSH+LTRIM</p></li><li><p><strong>微博或者公众号TimeLine</strong>: 有人发布文章，用 lpush 加入时间轴，展示新的列表信息</p></li><li><p><strong>消息队列</strong></p></li></ul><h3 id="set结构" tabindex="-1"><a class="header-anchor" href="#set结构" aria-hidden="true">#</a> Set结构</h3><h4 id="命令使用-3" tabindex="-1"><a class="header-anchor" href="#命令使用-3" aria-hidden="true">#</a> 命令使用</h4><table><thead><tr><th>命令</th><th>简述</th><th>使用</th></tr></thead><tbody><tr><td>SADD</td><td>向集合添加一个或多个成员</td><td>SADD key value</td></tr><tr><td>SREM</td><td>从集合key中删除元素</td><td>SREM key member [member ...]</td></tr><tr><td>SCARD</td><td>获取集合的成员个数</td><td>SCARD key</td></tr><tr><td>SMEMBERS</td><td>返回集合中的所有成员</td><td>SMEMBERS key member</td></tr><tr><td>SISMEMBER</td><td>判断 member 元素是否是集合 key 的成员</td><td>SISMEMBER key member</td></tr><tr><td>SPOP</td><td>从集合key中选出count个元素，元素从key中删除</td><td>SPOP key [count]</td></tr><tr><td>SRANDMEMBER</td><td>从集合key中选出count个元素，元素不从key中删除</td><td>SRANDMEMBER key [count]</td></tr></tbody></table><h4 id="运算操作" tabindex="-1"><a class="header-anchor" href="#运算操作" aria-hidden="true">#</a> 运算操作</h4><table><thead><tr><th>命令</th><th>简述</th><th>使用</th></tr></thead><tbody><tr><td>SINTER</td><td>交集运算</td><td>SINTER key [key ...]</td></tr><tr><td>SINTERSTORE</td><td>将交集结果存入新集合destination中</td><td>SINTERSTORE destination key [key ..]</td></tr><tr><td>SUNION</td><td>并集运算</td><td>SUNION key [key ..]</td></tr><tr><td>SUNIONSTORE</td><td>将并集结果存入新集合destination中</td><td>SUNIONSTORE destination key [key ...]</td></tr><tr><td>SDIFF</td><td>差集运算</td><td>SDIFF key [key ...]</td></tr><tr><td>SDIFFSTORE</td><td>将差集结果存入新集合destination中</td><td>SDIFFSTORE destination key [key ...]</td></tr></tbody></table><h4 id="应用场景-3" tabindex="-1"><a class="header-anchor" href="#应用场景-3" aria-hidden="true">#</a> 应用场景</h4><ul><li><p><strong>微信抽奖小程序</strong></p></li><li><p><strong>微信微博点赞，收藏，标签</strong>，可以实现点赞，取消点赞，查看用户是否点赞，获取点赞的用户列表，获取点赞的用户数</p></li><li><p><strong>商品筛选</strong>，使用SINTER交集实现筛选</p></li><li><p><strong>微信微博关注</strong></p><p>共同关注：SINTER</p><p>我关注的人也关注：SISMEMBER</p><p>我可能认识的人：SDIFF</p></li></ul><h3 id="zset有序集合类型" tabindex="-1"><a class="header-anchor" href="#zset有序集合类型" aria-hidden="true">#</a> ZSet有序集合类型</h3><p>Redis 有序集合和集合一样也是 string 类型元素的集合, 且不允许重复的成员。不同的是每个元素都会关联一个 double 类型的分数。redis 正是通过分数来为集合中的成员进行从小到大的排序</p><p>有序集合的成员是唯一的, 但分数 (score) 却可以重复。有序集合是通过两种数据结构实现：</p><ol><li><p><strong>压缩列表 (ziplist)</strong>: ziplist 是为了提高存储效率而设计的一种特殊编码的双向链表。它可以存储字符串或者整数，存储整数时是采用整数的二进制而不是字符串形式存储。它能在 O(1) 的时间复杂度下完成 list 两端的 push 和 pop 操作。但是因为每次操作都需要重新分配 ziplist 的内存，所以实际复杂度和 ziplist 的内存使用量相关</p></li><li><p><strong>跳跃表（zSkiplist)</strong>: 跳跃表的性能可以保证在查找，删除，添加等操作的时候在对数期望时间内完成，这个性能是可以和平衡树来相比较的，而且在实现方面比平衡树要优雅，这是采用跳跃表的主要原因。跳跃表的复杂度是 O(log(n))。</p><figure><img src="https://img.jssjqd.cn/202212030159580.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure></li></ol><h4 id="命令使用-4" tabindex="-1"><a class="header-anchor" href="#命令使用-4" aria-hidden="true">#</a> <strong>命令使用</strong></h4><table><thead><tr><th>命令</th><th>简述</th><th>使用</th></tr></thead><tbody><tr><td>ZADD</td><td>将一个带有给定分值的成员添加到有序集合里面</td><td>ZADD zset-key 178 member1</td></tr><tr><td>ZRANGE</td><td>正序获取有序集合key从start下标到stop下标的元素</td><td>ZRANGE key start stop [WITHSCORES]</td></tr><tr><td>ZREVRANGE</td><td>倒序获取有序集合key从start下标到stop下标的元素</td><td>ZREVRANGE key start stop [WITHSCORES]</td></tr><tr><td>ZREM</td><td>如果给定元素成员存在于有序集合中，那么就移除这个元素</td><td>ZREM zset-key member1 [member …]</td></tr><tr><td>ZSCORE</td><td>返回有序集合key中元素member的分值</td><td>ZSCORE key member</td></tr><tr><td>ZINCRBY</td><td>为有序集合key中元素member的分值加上increment</td><td>ZINCRBY key increment member</td></tr><tr><td>ZCARD</td><td>返回有序集合key中元素个数</td><td>ZCARD key</td></tr><tr><td>ZUNIONSTORE</td><td>并集计算</td><td>ZUNIONSTORE destkey numkeys key [key ...]</td></tr><tr><td>ZINTERSTORE</td><td>交集计算</td><td>ZINTERSTORE destkey numkeys key [key …]</td></tr></tbody></table><figure><img src="https://img.jssjqd.cn/20221015044224.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="应用场景-4" tabindex="-1"><a class="header-anchor" href="#应用场景-4" aria-hidden="true">#</a> 应用场景</h4><ul><li><strong>排行榜</strong>：有序集合经典使用场景。例如小说视频等网站需要对用户上传的小说视频做排行榜，榜单可以按照用户关注数，，点击数，更新时间，字数等打分，做排行。</li></ul>',41),s=[i];function h(n,l){return d(),e("div",null,s)}const g=t(a,[["render",h],["__file","index.html.vue"]]);export{g as default};
