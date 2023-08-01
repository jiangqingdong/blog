import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-c8395efa.js";const e={},p=t(`<p>电商管理后台跟其他管理系统一样，本质上是一个纯粹的CRUD管理系统，没有什么技术难度。这一类系统通常都不是项目的核心模块，但是却是串联核心业务必不可少的辅助模块。对于后台管理系统，我们今天还是关注他的技术路线，至于业务功能，大家可以随着以后各个业务线的具体设计过程再继续深入。</p><p>重点关注两个问题：</p><ul><li><p>通过后台项目快速理解电商数据全貌。先整体梳理一下电商项目的后台表结构，快速梳理电商管理系统的后台数据管理功能。</p></li><li><p>如何给普通的CRUD管理系统赋能。电商后台功能虽然复杂，但是其实后端技术层面的难度并不大，相信大家就算自己实现也没有什么难度。但是在今天课程中，会带大家打开技术想象力，给这个简单的系统增加不一样的设计。带你接触一下什么是互联网思维。</p></li></ul><h2 id="电商后台项目需要访问的数据源说明" tabindex="-1"><a class="header-anchor" href="#电商后台项目需要访问的数据源说明" aria-hidden="true">#</a> 电商后台项目需要访问的数据源说明</h2><p>整个电商管理后台本质上是一个纯粹的CRUD管理系统，所以，整个电商项目的数据库设计情况：</p><table><thead><tr><th>库名</th><th>表前缀</th><th>说明</th></tr></thead><tbody><tr><td>tl_mall_goods</td><td>pms_</td><td>商品相关表</td></tr><tr><td>tl_mall_normal</td><td>cms_</td><td>其他辅助功能相关表</td></tr><tr><td>tl_mall_promotion</td><td>sms_</td><td>促销相关表</td></tr><tr><td>tl_mall_user</td><td>ums_</td><td>用户管理相关表</td></tr><tr><td>tl_mall_cart</td><td>oms_cart_</td><td>购物车相关表</td></tr><tr><td>tl_mall_order</td><td>oms_</td><td>订单相关表</td></tr></tbody></table><p>这些不同库中的很多基础数据，除了购物车模块外，都需要由电商管理后台进行统一管理。所以，对于电商管理系统，会采用多数据源管理的方式，尽量快速的完成基础数据维护。其中，订单库由于进行了分库分表，管理比较复杂，所以电商管理后台不会直接访问订单相关的表，而是通过微服务的方式调用订单模块的相关功能来间接管理订单。</p><h2 id="电商后台使用mybatis-plus快速访问多个数据源" tabindex="-1"><a class="header-anchor" href="#电商后台使用mybatis-plus快速访问多个数据源" aria-hidden="true">#</a> 电商后台使用MyBatis-plus快速访问多个数据源</h2><p>电商后台项目使用的MyBatis-plus框架访问数据库。对于MyBatis和MyBatis-plus框架，这里就不多做介绍了。而我们这个电商后台管理项目，与常见的一些普通的管理系统的最大区别，在于这个电商项目管理数据的方式更为直接粗暴，直接跨多个数据库管理的后台数据。这里分享三种常用的多数据源管理方案：</p><blockquote><p>示例参见：springboot_dynamicdatasource</p></blockquote><h3 id="使用spring提供的abstractroutingdatasource" tabindex="-1"><a class="header-anchor" href="#使用spring提供的abstractroutingdatasource" aria-hidden="true">#</a> 使用Spring提供的AbstractRoutingDataSource</h3><p>这种方式的核心是使用Spring提供的AbstractRoutingDataSource抽象类，注入多个数据源。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Primary</span>   <span class="token comment">// 将该Bean设置为主要注入Bean</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DynamicDataSource</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractRoutingDataSource</span> <span class="token punctuation">{</span>
    <span class="token comment">// 当前使用的数据源标识</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 写</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">DataSource</span> dataSource1<span class="token punctuation">;</span>
    <span class="token comment">// 读</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">DataSource</span> dataSource2<span class="token punctuation">;</span>

    <span class="token comment">// 返回当前数据源标识</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">determineCurrentLookupKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 为targetDataSources初始化所有数据源</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> targetDataSources <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        targetDataSources<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;W&quot;</span><span class="token punctuation">,</span> dataSource1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        targetDataSources<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;R&quot;</span><span class="token punctuation">,</span> dataSource2<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">setTargetDataSources</span><span class="token punctuation">(</span>targetDataSources<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 为defaultTargetDataSource 设置默认的数据源</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">setDefaultTargetDataSource</span><span class="token punctuation">(</span>dataSource1<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将自己实现的DynamicDataSource注册成为默认的DataSource实例后，只需要在每次使用DataSource时，提前改变一下其中的name标识，就可以快速切换数据源。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DynamicDataSourceAspect</span> <span class="token keyword">implements</span> <span class="token class-name">Ordered</span> <span class="token punctuation">{</span>

    <span class="token comment">// 前置</span>
    <span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">&quot;within(com.tuling.dynamic.datasource.service.impl.*) &amp;&amp; @annotation(wr)&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">before</span><span class="token punctuation">(</span><span class="token class-name">JoinPoint</span> point<span class="token punctuation">,</span> <span class="token class-name">WR</span> wr<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> name <span class="token operator">=</span> wr<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">DynamicDataSource</span><span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 环绕通知</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用mybatis注册多个sqlsessionfactory" tabindex="-1"><a class="header-anchor" href="#使用mybatis注册多个sqlsessionfactory" aria-hidden="true">#</a> 使用MyBatis注册多个SqlSessionFactory</h3><p>如果使用MyBatis框架，要注册多个数据源的话，就需要将MyBatis底层的DataSource、SqlSessionFactory、DataSourceTransactionManager这些核心对象一并进行手动注册。例如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token comment">// 继承mybatis:</span>
<span class="token comment">// 1. 指定扫描的mapper接口包（主库）</span>
<span class="token comment">// 2. 指定使用sqlSessionFactory是哪个（主库）</span>
<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token string">&quot;com.tuling.datasource.dynamic.mybatis.mapper.r&quot;</span><span class="token punctuation">,</span>
        sqlSessionFactoryRef<span class="token operator">=</span><span class="token string">&quot;rSqlSessionFactory&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RMyBatisConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;spring.datasource.datasource2&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">dataSource2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 底层会自动拿到spring.datasource中的配置， 创建一个DruidDataSource</span>
        <span class="token keyword">return</span> <span class="token class-name">DruidDataSourceBuilder</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@Primary</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionFactory</span> <span class="token function">rSqlSessionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">SqlSessionFactoryBean</span> sessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 指定主库</span>
        sessionFactory<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span><span class="token function">dataSource2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 指定主库对应的mapper.xml文件</span>
        <span class="token comment">/*sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver()
                .getResources(&quot;classpath:mapper/r/*.xml&quot;));*/</span>
        <span class="token keyword">return</span> sessionFactory<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>



    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSourceTransactionManager</span> <span class="token function">rTransactionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">DataSourceTransactionManager</span> dataSourceTransactionManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DataSourceTransactionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSourceTransactionManager<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span><span class="token function">dataSource2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> dataSourceTransactionManager<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">TransactionTemplate</span> <span class="token function">rTransactionTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TransactionTemplate</span><span class="token punctuation">(</span><span class="token function">rTransactionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就完成了读库的注册。而读库与写库之间，就可以通过指定不同的Mapper和XML文件的地址来进行区分。</p><h3 id="使用dynamic-datasource框架" tabindex="-1"><a class="header-anchor" href="#使用dynamic-datasource框架" aria-hidden="true">#</a> 使用dynamic-datasource框架</h3><p>dynamic-datasource是MyBaits-plus作者设计的一个多数据源开源方案。使用这个框架需要引入对应的pom依赖</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.baomidou<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>dynamic-datasource-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.5.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就可以在SpringBoot的配置文件中直接配置多个数据源。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">dynamic</span><span class="token punctuation">:</span>
      <span class="token comment">#设置默认的数据源或者数据源组,默认值即为master</span>
      <span class="token key atrule">primary</span><span class="token punctuation">:</span> master
      <span class="token comment">#严格匹配数据源,默认false. true未匹配到指定数据源时抛异常,false使用默认数据源</span>
      <span class="token key atrule">strict</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
        <span class="token key atrule">master</span><span class="token punctuation">:</span>
          <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//127.0.0.1<span class="token punctuation">:</span>3306/datasource1<span class="token punctuation">?</span>serverTimezone=UTC<span class="token important">&amp;useUnicode=true&amp;characterEncoding=UTF8&amp;useSSL=false</span>
          <span class="token key atrule">username</span><span class="token punctuation">:</span> root
          <span class="token key atrule">password</span><span class="token punctuation">:</span> root
          <span class="token key atrule">initial-size</span><span class="token punctuation">:</span> <span class="token number">1</span>
          <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">1</span>
          <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">20</span>
          <span class="token key atrule">test-on-borrow</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
        <span class="token key atrule">slave_1</span><span class="token punctuation">:</span>
          <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//127.0.0.1<span class="token punctuation">:</span>3306/datasource2<span class="token punctuation">?</span>serverTimezone=UTC<span class="token important">&amp;useUnicode=true&amp;characterEncoding=UTF8&amp;useSSL=false</span>
          <span class="token key atrule">username</span><span class="token punctuation">:</span> root
          <span class="token key atrule">password</span><span class="token punctuation">:</span> root
          <span class="token key atrule">initial-size</span><span class="token punctuation">:</span> <span class="token number">1</span>
          <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">1</span>
          <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">20</span>
          <span class="token key atrule">test-on-borrow</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就配置完成了master和slave_1两个数据库。</p><p>接下来在使用时，只要在对应的方法或者类上添加@DS注解即可。例如</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FriendImplService</span> <span class="token keyword">implements</span> <span class="token class-name">FriendService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">FriendMapper</span> friendMapper<span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token annotation punctuation">@DS</span><span class="token punctuation">(</span><span class="token string">&quot;slave_1&quot;</span><span class="token punctuation">)</span>  <span class="token comment">// 从库， 如果按照下划线命名方式配置多个  ， 可以指定前缀即可（组名）</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Friend</span><span class="token punctuation">&gt;</span></span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> friendMapper<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token annotation punctuation">@DS</span><span class="token punctuation">(</span><span class="token string">&quot;master&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">Friend</span> friend<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        friendMapper<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>friend<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@DS</span><span class="token punctuation">(</span><span class="token string">&quot;master&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@DSTransactional</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 执行多数据源的操作</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当前电商管理后台采用了第三种方式来进行多数据源的管理。</p><p>oms订单数据除外。因为订单相关数据已经完成了分库分表，不能直接查。</p>`,29),c=[p];function o(i,l){return s(),a("div",null,c)}const d=n(e,[["render",o],["__file","index.html.vue"]]);export{d as default};
