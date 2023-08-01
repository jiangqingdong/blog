import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as i,c as l,a as n,b as s,e,f as a}from"./app-21ce620e.js";const u={},c=a('<p>ES的Query DSL查询语法很多，如何选择合适的语法，需要理解以下几点：</p><ul><li>需求： 精确值还是全文？</li><li>分词器会影响查询结果，不同的字段可以指定不同的分词器</li><li>Elasticsearch 默认会以文档的相关度算分进行排序</li></ul><p>ES版本: v7.17.3</p><h2 id="es倒排索引" tabindex="-1"><a class="header-anchor" href="#es倒排索引" aria-hidden="true">#</a> ES倒排索引</h2><p>当数据写入 ES 时，数据将会通过 分词 被切分为不同的 term，ES 将 term 与其对应的文档列表建立一种映射关系，这种结构就是 倒排索引。如下图所示：</p><figure><img src="https://img.jssjqd.cn/202212112140069.png" alt="image-20221211214032371" tabindex="0" loading="lazy"><figcaption>image-20221211214032371</figcaption></figure><p>为了进一步提升索引的效率，ES 在 term 的基础上利用 term 的前缀或者后缀构建了 term index, 用于对 term 本身进行索引，ES 实际的索引结构如下图所示：</p><figure><img src="https://img.jssjqd.cn/202212112140018.png" alt="image-20221211214046019" tabindex="0" loading="lazy"><figcaption>image-20221211214046019</figcaption></figure><p>这样当我们去搜索某个关键词时，ES 首先根据它的前缀或者后缀迅速缩小关键词的在 term dictionary 中的范围，大大减少了磁盘IO的次数。</p>',9),r=n("p",null,"单词词典（Term Dictionary) ：记录所有文档的单词，记录单词到倒排列表的关联关系",-1),d={href:"https://www.cnblogs.com/LBSer/p/4119841.html",target:"_blank",rel:"noopener noreferrer"},v=n("li",null,[n("p",null,"倒排列表(Posting List)-记录了单词对应的文档结合，由倒排索引项组成")],-1),k=n("li",null,[n("p",null,"倒排索引项(Posting)：")],-1),m=n("li",null,[n("ul",null,[n("li",null,"文档ID"),n("li",null,"词频TF–该单词在文档中出现的次数，用于相关性评分"),n("li",null,"位置(Position)-单词在文档中分词的位置。用于 搜索（match phrase query)"),n("li",null,"偏移(Offset)-记录单词的开始结束位置，实现高亮显示")])],-1),q=a(`<figure><img src="https://img.jssjqd.cn/202212112140992.png" alt="image-20221211214055984" tabindex="0" loading="lazy"><figcaption>image-20221211214055984</figcaption></figure><p>Elasticsearch 的JSON文档中的每个字段，都有自己的倒排索引。</p><p>可以指定对某些字段不做索引：</p><ul><li>优点︰节省存储空间</li><li>缺点: 字段无法被搜索</li></ul><h2 id="文档映射mapping" tabindex="-1"><a class="header-anchor" href="#文档映射mapping" aria-hidden="true">#</a> 文档映射Mapping</h2><p>Mapping类似数据库中的schema的定义，作用如下：</p><ul><li>定义索引中的字段的名称</li><li>定义字段的数据类型，例如字符串，数字，布尔等</li><li>字段，倒排索引的相关配置(Analyzer)</li></ul><p>ES中Mapping映射可以分为动态映射和静态映射。</p><p><strong>动态映射：</strong></p><p>在关系数据库中，需要事先创建数据库，然后在该数据库下创建数据表，并创建表字段、类型、长度、主键等，最后才能基于表插入数据。而Elasticsearch中不需要定义Mapping映射（即关系型数据库的表、字段等），在文档写入Elasticsearch时，会根据文档字段自动识别类型，这种机制称之为动态映射。</p><p><strong>静态映射：</strong></p><p>静态映射是在Elasticsearch中也可以事先定义好映射，包含文档的各字段类型、分词器等，这种方式称之为静态映射。</p><p>动态映射（Dynamic Mapping）的机制，使得我们无需手动定义Mappings，Elasticsearch会自动根据文档信息，推算出字段的类型。但是有时候会推算的不对，例如地理位置信息。当类型如果设置不对时，会导致一些功能无法正常运行，例如Range查询</p><p><strong>Dynamic Mapping类型自动识别：</strong></p><figure><img src="https://img.jssjqd.cn/202212112145581.png" alt="image-20221211214542690" tabindex="0" loading="lazy"><figcaption>image-20221211214542690</figcaption></figure><p>示例</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#删除原索引
DELETE /user

#创建文档(ES根据数据类型<span class="token punctuation">,</span> 会自动创建映射)
PUT /user/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;fox&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">32</span><span class="token punctuation">,</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span><span class="token string">&quot;长沙麓谷&quot;</span>
<span class="token punctuation">}</span>

#获取文档映射
GET /user/_mapping
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://img.jssjqd.cn/202212112226924.png" alt="image-20221211222616582" tabindex="0" loading="lazy"><figcaption>image-20221211222616582</figcaption></figure><p>思考：能否后期更改Mapping的字段类型？</p><p>两种情况：</p><ul><li><p><strong>新增加字段</strong></p></li><li><ul><li>dynamic设为true时，一旦有新增字段的文档写入，Mapping 也同时被更新</li><li>dynamic设为false，Mapping 不会被更新，新增字段的数据无法被索引，但是信息会出现在_source中</li><li>dynamic设置成strict(严格控制策略)，文档写入失败，抛出异常</li></ul></li></ul><table><thead><tr><th></th><th>true</th><th>false</th><th>strict</th></tr></thead><tbody><tr><td>文档可索引</td><td>yes</td><td>yes</td><td>no</td></tr><tr><td>字段可索引</td><td>yes</td><td>no</td><td>no</td></tr><tr><td>Mapping被更新</td><td>yes</td><td>no</td><td>no</td></tr></tbody></table><ul><li><p><strong>对已有字段，一旦已经有数据写入，就不再支持修改字段定义</strong></p></li><li><ul><li>Lucene 实现的倒排索引，一旦生成后，就不允许修改</li><li>如果希望改变字段类型，可以利用 reindex API，重建索引</li></ul></li></ul><p>原因：</p><ul><li>如果修改了字段的数据类型，会导致已被索引的数据无法被搜索</li><li>但是如果是增加新的字段，就不会有这样的影响</li></ul><p>测试</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /user
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dynamic&quot;</span><span class="token operator">:</span> <span class="token string">&quot;strict&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;dynamic&quot;</span><span class="token operator">:</span> <span class="token string">&quot;true&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
# 插入文档报错，原因为age为新增字段<span class="token punctuation">,</span>会抛出异常
PUT /user/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;fox&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">32</span><span class="token punctuation">,</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;province&quot;</span><span class="token operator">:</span><span class="token string">&quot;湖南&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;city&quot;</span><span class="token operator">:</span><span class="token string">&quot;长沙&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dynamic设置成strict，新增age字段导致文档插入失败</p><figure><img src="https://img.jssjqd.cn/202212112227471.png" alt="image-20221211222659393" tabindex="0" loading="lazy"><figcaption>image-20221211222659393</figcaption></figure><p>修改dynamic后再次插入文档成功</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#修改daynamic
PUT /user/_mapping
<span class="token punctuation">{</span>
  <span class="token property">&quot;dynamic&quot;</span><span class="token operator">:</span><span class="token boolean">true</span>
<span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对已有字段的mapping修改</strong></p><p>具体方法：</p><p>1）如果要推倒现有的映射, 你得重新建立一个静态索引</p><p>2）然后把之前索引里的数据导入到新的索引里</p><p>3）删除原创建的索引</p><p>4）为新索引起个别名, 为原索引名</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /user2
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ik_max_word&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST _reindex
<span class="token punctuation">{</span>
<span class="token property">&quot;source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;user&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;user2&quot;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

DELETE /user

PUT /user2/_alias/user

GET /user     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意: 通过这几个步骤就实现了索引的平滑过渡,并且是零停机</p><h3 id="常用mapping参数配置" tabindex="-1"><a class="header-anchor" href="#常用mapping参数配置" aria-hidden="true">#</a> 常用Mapping参数配置</h3><ul><li>index: 控制当前字段是否被索引，默认为true。如果设置为false，该字段不可被搜索</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE /user
PUT /user
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;long&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT /user/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;fox&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span><span class="token string">&quot;广州白云山公园&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">30</span>
<span class="token punctuation">}</span>

GET /user

GET /user/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://img.jssjqd.cn/202212112246910.png" alt="image-20221211224601650" tabindex="0" loading="lazy"><figcaption>image-20221211224601650</figcaption></figure><ul><li><p>有四种不同基本的index options配置，控制倒排索引记录的内容：</p></li><li><ul><li>docs : 记录doc id</li><li>freqs：记录doc id 和term frequencies（词频）</li><li>positions: 记录doc id / term frequencies / term position</li><li>offsets: doc id / term frequencies / term posistion / character offsets</li></ul></li></ul><p>text类型默认记录postions，其他默认为 docs。记录内容越多，占用存储空间越大</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE /user
PUT /user
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;index_options&quot;</span><span class="token operator">:</span> <span class="token string">&quot;offsets&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;long&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>null_value: 需要对Null值进行搜索，只有keyword类型支持设计Null_Value</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE /user
PUT /user
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;null_value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;NULL&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;long&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT /user/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;fox&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">32</span><span class="token punctuation">,</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span><span class="token null keyword">null</span>
<span class="token punctuation">}</span>

GET /user/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;NULL&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://img.jssjqd.cn/202212112254741.png" alt="image-20221211225411837" tabindex="0" loading="lazy"><figcaption>image-20221211225411837</figcaption></figure><ul><li>copy_to设置：将字段的数值拷贝到目标字段，满足一些特定的搜索需求。copy_to的目标字段不出现在_source中。</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># 设置copy_to
DELETE /address
PUT /address
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;province&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;copy_to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;full_address&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;city&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;copy_to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;full_address&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;settings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;analysis.analyzer.default.type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ik_max_word&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT /address/_bulk
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;province&quot;</span><span class="token operator">:</span> <span class="token string">&quot;湖南&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;city&quot;</span><span class="token operator">:</span> <span class="token string">&quot;长沙&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;province&quot;</span><span class="token operator">:</span> <span class="token string">&quot;湖南&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;city&quot;</span><span class="token operator">:</span> <span class="token string">&quot;常德&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;province&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广东&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;city&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;province&quot;</span><span class="token operator">:</span> <span class="token string">&quot;湖南&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;city&quot;</span><span class="token operator">:</span> <span class="token string">&quot;邵阳&quot;</span><span class="token punctuation">}</span>

GET /address/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;full_address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;湖南常德&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;operator&quot;</span><span class="token operator">:</span> <span class="token string">&quot;and&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="index-template" tabindex="-1"><a class="header-anchor" href="#index-template" aria-hidden="true">#</a> Index Template</h3><p>Index Templates可以帮助你设定Mappings和Settings，并按照一定的规则，自动匹配到新创建的索引之上</p><ul><li>模版仅在一个索引被新创建时，才会产生作用。修改模版不会影响已创建的索引</li><li>你可以设定多个索引模版，这些设置会被“merge”在一起</li><li>你可以指定“order”的数值，控制“merging”的过程</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /_template/template_default
<span class="token punctuation">{</span>
  <span class="token property">&quot;index_patterns&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;number_of_shards&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;number_of_replicas&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


PUT /_template/template_test
<span class="token punctuation">{</span>
  <span class="token property">&quot;index_patterns&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;test*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;number_of_shards&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;number_of_replicas&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;date_detection&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">&quot;numeric_detection&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>lndex Template的工作方式</strong></p><p>当一个索引被新创建时：</p><ul><li>应用Elasticsearch 默认的settings 和mappings</li><li>应用order数值低的lndex Template 中的设定</li><li>应用order高的 Index Template 中的设定，之前的设定会被覆盖</li><li>应用创建索引时，用户所指定的Settings和 Mappings，并覆盖之前模版中的设定</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#查看template信息
GET /_template/template_default
GET /_template/temp*

PUT /testtemplate/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;orderNo&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;createDate&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2022/01/01&quot;</span>
<span class="token punctuation">}</span>
GET /testtemplate/_mapping
GET /testtemplate/_settings

PUT /testmy
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;date_detection&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT /testmy/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;orderNo&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;createDate&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2022/01/01&quot;</span>
<span class="token punctuation">}</span>

GET /testmy/_mapping     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dynamic-template" tabindex="-1"><a class="header-anchor" href="#dynamic-template" aria-hidden="true">#</a> Dynamic Template</h3><p>Dynamic Tempate定义在个索引的Mapping中。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#Dynaminc Mapping 根据类型和字段名
DELETE my_index
PUT my_index/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;firstName&quot;</span><span class="token operator">:</span><span class="token string">&quot;Ruan&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;isVIP&quot;</span><span class="token operator">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

GET my_index/_mapping
DELETE my_index
PUT my_index
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dynamic_templates&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
        <span class="token property">&quot;strings_as_boolean&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;match_mapping_type&quot;</span><span class="token operator">:</span>   <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;match&quot;</span><span class="token operator">:</span><span class="token string">&quot;is*&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;mapping&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;boolean&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;strings_as_keywords&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;match_mapping_type&quot;</span><span class="token operator">:</span>   <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;mapping&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

#结合路径
PUT /my_test_index
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dynamic_templates&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;full_name&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;path_match&quot;</span><span class="token operator">:</span> <span class="token string">&quot;name.*&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;path_unmatch&quot;</span><span class="token operator">:</span> <span class="token string">&quot;*.middle&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;mapping&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;copy_to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;full_name&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT /my_test_index/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;first&quot;</span><span class="token operator">:</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;middle&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Winston&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;last&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Lennon&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


GET /my_test_index/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;full_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;John&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="es高级查询query-dsl" tabindex="-1"><a class="header-anchor" href="#es高级查询query-dsl" aria-hidden="true">#</a> ES高级查询Query DSL</h2><p>ES中提供了一种强大的检索数据方式,这种检索方式称之为Query DSL（Domain Specified Language） , Query DSL是利用Rest API传递JSON格式的请求体(RequestBody)数据与ES进行交互，这种方式的丰富查询语法让ES检索变得更强大，更简洁。</p>`,64),b={href:"https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl.html",target:"_blank",rel:"noopener noreferrer"},g=a(`<p>语法:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_doc/_search <span class="token punctuation">{</span>json请求体数据<span class="token punctuation">}</span>
可以简化为下面写法
GET /es_db/_search <span class="token punctuation">{</span>json请求体数据<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#无条件查询，默认返回<span class="token number">10</span>条数据
GET /es_db/_search
<span class="token punctuation">{</span>
<span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
<span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://img.jssjqd.cn/202212112306193.png" alt="image-20221211230646000" tabindex="0" loading="lazy"><figcaption>image-20221211230646000</figcaption></figure><p>示例数据</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#指定ik分词器
PUT /es_db
<span class="token punctuation">{</span>
  <span class="token property">&quot;settings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;analysis.analyzer.default.type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ik_max_word&quot;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

# 创建文档<span class="token punctuation">,</span>指定id
PUT /es_db/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;sex&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
<span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州天河公园&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;remark&quot;</span><span class="token operator">:</span> <span class="token string">&quot;java developer&quot;</span>
<span class="token punctuation">}</span>
PUT /es_db/_doc/<span class="token number">2</span>
<span class="token punctuation">{</span>
<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;sex&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
<span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州荔湾大厦&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;remark&quot;</span><span class="token operator">:</span> <span class="token string">&quot;java assistant&quot;</span>
<span class="token punctuation">}</span>

PUT /es_db/_doc/<span class="token number">3</span>
<span class="token punctuation">{</span>
<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;sex&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">,</span>
<span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州白云山公园&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;remark&quot;</span><span class="token operator">:</span> <span class="token string">&quot;php developer&quot;</span>
<span class="token punctuation">}</span>

PUT /es_db/_doc/<span class="token number">4</span>
<span class="token punctuation">{</span>
<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;赵六&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;sex&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
<span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;长沙橘子洲&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;remark&quot;</span><span class="token operator">:</span> <span class="token string">&quot;python assistant&quot;</span>
<span class="token punctuation">}</span>

PUT /es_db/_doc/<span class="token number">5</span>
<span class="token punctuation">{</span>
<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张龙&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;sex&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">19</span><span class="token punctuation">,</span>
<span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;长沙麓谷企业广场&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;remark&quot;</span><span class="token operator">:</span> <span class="token string">&quot;java architect assistant&quot;</span>
<span class="token punctuation">}</span>	
	
PUT /es_db/_doc/<span class="token number">6</span>
<span class="token punctuation">{</span>
<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;赵虎&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;sex&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">32</span><span class="token punctuation">,</span>
<span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;长沙麓谷兴工国际产业园&quot;</span><span class="token punctuation">,</span>
<span class="token property">&quot;remark&quot;</span><span class="token operator">:</span> <span class="token string">&quot;java architect&quot;</span>
<span class="token punctuation">}</span>			              
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询所有match-all" tabindex="-1"><a class="header-anchor" href="#查询所有match-all" aria-hidden="true">#</a> 查询所有match_all</h3><p>使用match_all，默认只会返回10条数据。</p><p>原因：_search查询默认采用的是分页查询，每页记录数size的默认值为10。如果想显示更多数据，指定size</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
等同于
GET /es_db/_search
<span class="token punctuation">{</span>
<span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
<span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="返回指定条数size" tabindex="-1"><a class="header-anchor" href="#返回指定条数size" aria-hidden="true">#</a> 返回指定条数size</h4><p>size 关键字: 指定查询结果中返回指定条数。 默认返回值10条</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">100</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>思考： size可以无限增加吗？</p><p>测试</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /es_db/_search
{
  &quot;query&quot;: {
    &quot;match_all&quot;: {}
  },
  &quot;size&quot;: 20000
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>出现异常：</p><figure><img src="https://img.jssjqd.cn/202212112308646.png" alt="image-20221211230759437" tabindex="0" loading="lazy"><figcaption>image-20221211230759437</figcaption></figure><p>异常原因：</p><p>1、查询结果的窗口太大，from + size的结果必须小于或等于10000，而当前查询结果的窗口为20000。</p><p>2、可以采用scroll api更高效的请求大量数据集。</p><p>3、查询结果的窗口的限制可以通过参数index.max_result_window进行设置。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /es_db/_settings
<span class="token punctuation">{</span> 
  <span class="token property">&quot;index.max_result_window&quot;</span> <span class="token operator">:</span><span class="token string">&quot;20000&quot;</span>
<span class="token punctuation">}</span>
#修改现有所有的索引，但新增的索引，还是默认的<span class="token number">10000</span>
PUT /_all/_settings
<span class="token punctuation">{</span> 
  <span class="token property">&quot;index.max_result_window&quot;</span> <span class="token operator">:</span><span class="token string">&quot;20000&quot;</span>
<span class="token punctuation">}</span>

#查看所有索引中的index.max_result_window值
GET /_all/_settings/index.max_result_window
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),y={href:"https://so.csdn.net/so/search?q=%E5%86%85%E5%AD%98&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},h=a(`<p>比如：from为1000000，size为10，逻辑意义是从满足条件的数据中取1000000到（1000000 + 10）的记录。这时ES一定要先将（1000000 + 10）的记录（即result_window）加载到内存中，再进行分页取值的操作。尽管最后我们只取了10条数据返回给客户端，但ES进程执行查询操作的过程中确需要将（1000000 + 10）的记录都加载到内存中，可想而知对内存的消耗有多大。这也是ES中不推荐采用（from + size）方式进行深度分页的原因。</p><p>同理，from为0，size为1000000时，ES进程执行查询操作的过程中确需要将1000000 条记录都加载到内存中再返回给调用方，也会对ES内存造成很大压力。</p><h4 id="分页查询from" tabindex="-1"><a class="header-anchor" href="#分页查询from" aria-hidden="true">#</a> 分页查询from</h4><p>from 关键字: 用来指定起始返回位置，和size关键字连用可实现分页效果</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="深分页查询scroll" tabindex="-1"><a class="header-anchor" href="#深分页查询scroll" aria-hidden="true">#</a> 深分页查询Scroll</h4><p>改动index.max_result_window参数值的大小，只能解决一时的问题，当索引的数据量持续增长时，在查询全量数据时还是会出现问题。而且会增加ES服务器内存大结果集消耗完的风险。最佳实践还是根据异常提示中的采用scroll api更高效的请求大量数据集。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#查询命令中新增scroll=1m<span class="token punctuation">,</span>说明采用游标查询，保持游标查询窗口一分钟。
#这里由于测试数据量不够，所以size值设置为<span class="token number">2</span>。
#实际使用中为了减少游标查询的次数，可以将值适当增大，比如设置为<span class="token number">1000</span>。
GET /es_db/_search?scroll=1m 
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;size&quot;</span><span class="token operator">:</span>  <span class="token number">2</span>
<span class="token punctuation">}</span>       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询结果：</p><p>除了返回前2条记录，还返回了一个游标ID值_scroll_id。<img src="https://img.jssjqd.cn/202212112314755.png" alt="image-20221211231404843" loading="lazy"></p><p>采用游标id查询：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># scroll_id 的值就是上一个请求中返回的 _scroll_id 的值
GET /_search/scroll
<span class="token punctuation">{</span>
    <span class="token property">&quot;scroll&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1m&quot;</span><span class="token punctuation">,</span> 
    <span class="token property">&quot;scroll_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;FGluY2x1ZGVfY29udGV4dF91dWlkDXF1ZXJ5QW5kRmV0Y2gBFmNwcVdjblRxUzVhZXlicG9HeU02bWcAAAAAAABmzRY2YlV3Z0o5VVNTdWJobkE5Z3MtXzJB&quot;</span>
<span class="token punctuation">}</span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://img.jssjqd.cn/202212112314465.png" alt="image-20221211231431406" tabindex="0" loading="lazy"><figcaption>image-20221211231431406</figcaption></figure><p>多次根据scroll_id游标查询，直到没有数据返回则结束查询。采用游标查询索引全量数据，更安全高效，限制了单次对内存的消耗。</p><h4 id="指定字段排序sort" tabindex="-1"><a class="header-anchor" href="#指定字段排序sort" aria-hidden="true">#</a> 指定字段排序sort</h4><p>注意：会让得分失效</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token string">&quot;desc&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

#排序，分页
GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token string">&quot;desc&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">5</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="返回指定字段-source" tabindex="-1"><a class="header-anchor" href="#返回指定字段-source" aria-hidden="true">#</a> 返回指定字段_source</h4><p>_source 关键字: 是一个数组,在数组中用来指定展示那些字段</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;address&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>match</strong></p><p>match在匹配时会对所查找的关键词进行分词，然后按分词匹配查找</p><p>match支持以下参数：</p><ul><li><p>query : 指定匹配的值</p></li><li><p>operator : 匹配条件类型</p></li><li><ul><li>and : 条件分词后都要匹配</li><li>or : 条件分词后有一个匹配即可(默认)</li></ul></li><li><p>minmum_should_match : 最低匹配度，即条件在倒排索引中最低的匹配度</p></li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#模糊匹配 match   分词后or的效果
GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州白云山公园&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

# 分词后 and的效果
GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州白云山公园&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;operator&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AND&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>              
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在match中的应用： 当operator参数设置为or时，minnum_should_match参数用来控制匹配的分词的最少数量。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># 最少匹配广州，公园两个词
GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州公园&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;minimum_should_match&quot;</span><span class="token operator">:</span> <span class="token number">2</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="短语查询match-phrase" tabindex="-1"><a class="header-anchor" href="#短语查询match-phrase" aria-hidden="true">#</a> 短语查询match_phrase</h3><p>match_phrase查询分析文本并根据分析的文本创建一个短语查询。match_phrase 会将检索关键词分词。match_phrase的分词结果必须在被检索字段的分词中都包含，而且顺序必须相同，而且默认必须都是连续的。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_phrase&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州白云山&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_phrase&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州白云&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>思考：为什么查询广州白云山有数据，广州白云没有数据？</p><figure><img src="https://img.jssjqd.cn/202212112324527.png" alt="image-20221211232410276" tabindex="0" loading="lazy"><figcaption>image-20221211232410276</figcaption></figure><p>分析原因：</p><p>先查看广州白云山公园分词结果，可以知道广州和白云不是相邻的词条，中间会隔一个白云山，而match_phrase匹配的是相邻的词条，所以查询广州白云山有结果，但查询广州白云没有结果。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST _analyze
<span class="token punctuation">{</span>
    <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span><span class="token string">&quot;ik_max_word&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;text&quot;</span><span class="token operator">:</span><span class="token string">&quot;广州白云山&quot;</span>
<span class="token punctuation">}</span>
#结果
<span class="token punctuation">{</span>
  <span class="token property">&quot;tokens&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;广州&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_WORD&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;白云山&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_WORD&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;白云&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_WORD&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;云山&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_WORD&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">3</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如何解决词条间隔的问题？可以借助slop参数，slop参数告诉match_phrase查询词条能够相隔多远时仍然将文档视为匹配。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#广州云山分词后相隔为<span class="token number">2</span>，可以匹配到结果
GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_phrase&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州云山&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;slop&quot;</span><span class="token operator">:</span> <span class="token number">2</span>
      <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多字段查询multi-match" tabindex="-1"><a class="header-anchor" href="#多字段查询multi-match" aria-hidden="true">#</a> 多字段查询multi_match</h3><p>可以根据字段类型，决定是否使用分词查询，得分最高的在前面</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;长沙张龙&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;address&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;name&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：字段类型分词,将查询条件分词之后进行查询，如果该字段不分词就会将查询条件作为整体进行查询。</p><h3 id="query-string" tabindex="-1"><a class="header-anchor" href="#query-string" aria-hidden="true">#</a> query_string</h3><p>允许我们在单个查询字符串中指定AND | OR | NOT条件，同时也和 multi_match query 一样，支持多字段搜索。和match类似，但是match需要指定字段名，query_string是在所有字段中搜索，范围更广泛。</p><p>注意: 查询字段分词就将查询条件分词查询，查询字段不分词将查询条件不分词查询</p><ul><li><strong>未指定字段查询</strong></li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;query_string&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张三 OR 橘子洲&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>指定单个字段查询</strong></li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#Query String
GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;query_string&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;default_field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;address&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;白云山 OR 橘子洲&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>指定多个字段查询</strong></li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;query_string&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;address&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张三 OR (广州 AND 王五)&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="simple-query-string" tabindex="-1"><a class="header-anchor" href="#simple-query-string" aria-hidden="true">#</a> simple_query_string</h4><p>类似Query String，但是会忽略错误的语法,同时只支持部分查询语法，不支持AND OR NOT，会当作字符串处理。支持部分逻辑：</p><ul><li>+ 替代AND</li><li>| 替代OR</li><li>- 替代NOT</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#simple_query_string 默认的operator是OR
GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;simple_query_string&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;address&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州公园&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;default_operator&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AND&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;simple_query_string&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;address&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州 + 公园&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关键词查询term" tabindex="-1"><a class="header-anchor" href="#关键词查询term" aria-hidden="true">#</a> 关键词查询Term</h3><p>Term用来使用关键词查询(精确匹配),还可以用来查询没有被进行分词的数据类型。Term是表达语意的最小单位，搜索和利用统计语言模型进行自然语言处理都需要处理Term。match在匹配时会对所查找的关键词进行分词，然后按分词匹配查找，而term会直接对关键词进行查找。一般模糊查找的时候，多用match，而精确查找时可以使用term。</p><ul><li><p>ES中默认使用分词器为标准分词器(StandardAnalyzer),标准分词器对于英文单词分词,对于中文单字分词。</p></li><li><p>在ES的Mapping Type 中 keyword , date ,integer, long , double , boolean or ip 这些类型不分词，只有text类型分词。</p></li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#关键字查询 term
# 思考： 查询广州白云是否有数据，为什么？
GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州白云&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

# 采用term精确查询<span class="token punctuation">,</span> 查询字段映射类型为keyword
GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address.keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州白云山公园&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在ES中，Term查询，对输入不做分词。会将输入作为一个整体，在倒排索引中查找准确的词项，并且使用相关度算分公式为每个包含该词项的文档进行相关度算分。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /product/_bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;productId&quot;</span><span class="token operator">:</span><span class="token string">&quot;xxx123&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;productName&quot;</span><span class="token operator">:</span><span class="token string">&quot;iPhone&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;productId&quot;</span><span class="token operator">:</span><span class="token string">&quot;xxx111&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;productName&quot;</span><span class="token operator">:</span><span class="token string">&quot;iPad&quot;</span><span class="token punctuation">}</span>

# 思考： 查询iPhone可以查到数据吗？  
GET /product/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;productName&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;iPhone&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET /product/_analyze
<span class="token punctuation">{</span>
  <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span><span class="token string">&quot;standard&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span><span class="token string">&quot;iPhone&quot;</span>
<span class="token punctuation">}</span>

# 对于英文，可以考虑建立索引时忽略大小写
PUT /product
<span class="token punctuation">{</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;analysis&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;normalizer&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;es_normalizer&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;lowercase&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;asciifolding&quot;</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;custom&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;productId&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;productName&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;normalizer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;es_normalizer&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;true&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过 Constant Score 将查询转换成一个 Filtering，避免算分，并利用缓存，提高性能。</p><ul><li>将Query 转成 Filter，忽略TF-IDF计算，避免相关性算分的开销</li><li>Filter可以有效利用缓存</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;constant_score&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;address.keyword&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州白云山公园&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>ES中的结构化搜索</strong></p><p>结构化搜索(Structured search)是指对结构化数据的搜索。</p><p><strong>结构化数据：</strong></p><ul><li><p>日期，布尔类型和数字都是结构化的</p></li><li><p>文本也可以是结构化的。</p></li><li><ul><li>如彩色笔可以有离散的颜色集合：红(red) 、绿(green、蓝(blue)</li><li>一个博客可能被标记了标签，例如，分布式(distributed)和搜索(search)</li><li>电商网站上的商品都有UPC(通用产品码Universal Product Code)或其他的唯一</li></ul></li></ul><p>标识，它们都需要遵从严格规定的、结构化的格式。</p><p>应用场景：对bool，日期，数字，结构化的文本可以利用term做精确匹配</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">28</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>term处理多值字段，term查询是包含，不是等于</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employee/_bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;小明&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;interest&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;跑步&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;篮球&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;小红&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;interest&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;跳舞&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;画画&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;小丽&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;interest&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;跳舞&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;唱歌&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;跑步&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>

POST /employee/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;interest.keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;跑步&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>###前缀查询prefix</p><p>它会对分词后的term进行前缀搜索。</p><ul><li>它不会分析要搜索字符串，传入的前缀就是想要查找的前缀</li><li>默认状态下，前缀查询不做相关度分数计算，它只是将所有匹配的文档返回，然后赋予所有相关分数值为1。它的行为更像是一个过滤器而不是查询。两者实际的区别就是过滤器是可以被缓存的，而前缀查询不行。</li></ul><p>prefix的原理：需要遍历所有倒排索引，并比较每个term是否已所指定的前缀开头。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;prefix&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通配符查询wildcard" tabindex="-1"><a class="header-anchor" href="#通配符查询wildcard" aria-hidden="true">#</a> 通配符查询wildcard</h3><p>通配符查询：工作原理和prefix相同，只不过它不是只比较开头，它能支持更为复杂的匹配模式。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;wildcard&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;*白*&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="范围查询range" tabindex="-1"><a class="header-anchor" href="#范围查询range" aria-hidden="true">#</a> 范围查询range</h3><ul><li>range：范围关键字</li><li>gte 大于等于</li><li>lte 小于等于</li><li>gt 大于</li><li>lt 小于</li><li>now 当前时间</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
        <span class="token property">&quot;lte&quot;</span><span class="token operator">:</span> <span class="token number">28</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="日期range" tabindex="-1"><a class="header-anchor" href="#日期range" aria-hidden="true">#</a> 日期range</h4><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE /product
POST /product/_bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;price&quot;</span><span class="token operator">:</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token property">&quot;date&quot;</span><span class="token operator">:</span><span class="token string">&quot;2021-01-01&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;productId&quot;</span><span class="token operator">:</span><span class="token string">&quot;XHDK-1293&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;price&quot;</span><span class="token operator">:</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token property">&quot;date&quot;</span><span class="token operator">:</span><span class="token string">&quot;2022-01-01&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;productId&quot;</span><span class="token operator">:</span><span class="token string">&quot;KDKE-5421&quot;</span><span class="token punctuation">}</span>

GET /product/_mapping

GET /product/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;date&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token string">&quot;now-2y&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多id查询ids" tabindex="-1"><a class="header-anchor" href="#多id查询ids" aria-hidden="true">#</a> 多id查询ids</h3><p>ids 关键字 : 值为数组类型,用来根据一组id获取多个对应的文档</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;ids&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;values&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模糊查询fuzzy" tabindex="-1"><a class="header-anchor" href="#模糊查询fuzzy" aria-hidden="true">#</a> 模糊查询fuzzy</h3><p>在实际的搜索中，我们有时候会打错字，从而导致搜索不到。在Elasticsearch中，我们可以使用fuzziness属性来进行模糊查询，从而达到搜索有错别字的情形。</p><p>fuzzy 查询会用到两个很重要的参数，fuzziness，prefix_length</p><ul><li><p>fuzziness：表示输入的关键字通过几次操作可以转变成为ES库里面的对应field的字段</p></li><li><ul><li>操作是指：新增一个字符，删除一个字符，修改一个字符，每次操作可以记做编辑距离为1，</li><li>如中文集团到中威集团编辑距离就是1，只需要修改一个字符；</li><li>该参数默认值为0，即不开启模糊查询。</li><li>如果fuzziness值在这里设置成2，会把编辑距离为2的东东集团也查出来。</li></ul></li><li><p>prefix_length：表示限制输入关键字和ES对应查询field的内容开头的第n个字符必须完全匹配，不允许错别字匹配</p></li><li><ul><li>如这里等于1，则表示开头的字必须匹配，不匹配则不返回</li><li>默认值也是0</li><li>加大prefix_length的值可以提高效率和准确率。</li></ul></li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;fuzzy&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;白运山&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fuzziness&quot;</span><span class="token operator">:</span> <span class="token number">1</span>    
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广洲&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fuzziness&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意: fuzzy 模糊查询 最大模糊错误 必须在0-2之间</p><ul><li>搜索关键词长度为 2，不允许存在模糊</li><li>搜索关键词长度为3-5，允许1次模糊</li><li>搜索关键词长度大于5，允许最大2次模糊</li></ul><h3 id="高亮highlight" tabindex="-1"><a class="header-anchor" href="#高亮highlight" aria-hidden="true">#</a> 高亮highlight</h3><p>highlight 关键字: 可以让符合条件的文档中的关键词高亮。</p><p>highlight相关属性：</p><ul><li>pre_tags 前缀标签</li><li>post_tags 后缀标签</li><li>tags_schema 设置为styled可以使用内置高亮样式</li><li>require_field_match 多字段高亮需要设置为false</li></ul><p>示例数据</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#指定ik分词器
PUT /products
<span class="token punctuation">{</span>
  <span class="token property">&quot;settings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;analysis.analyzer.default.type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ik_max_word&quot;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT /products/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;proId&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;牛仔男外套&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;desc&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;牛仔外套男装春季衣服男春装夹克修身休闲男生潮牌工装潮流头号青年春秋棒球服男 7705浅蓝常规 XL&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timestamp&quot;</span> <span class="token operator">:</span> <span class="token number">1576313264451</span><span class="token punctuation">,</span>
  <span class="token property">&quot;createTime&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2019-12-13 12:56:56&quot;</span>
<span class="token punctuation">}</span>

PUT /products/_doc/<span class="token number">2</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;proId&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;6&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;HLA海澜之家牛仔裤男&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;desc&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;HLA海澜之家牛仔裤男2019时尚有型舒适HKNAD3E109A 牛仔蓝(A9)175/82A(32)&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timestamp&quot;</span> <span class="token operator">:</span> <span class="token number">1576314265571</span><span class="token punctuation">,</span>
  <span class="token property">&quot;createTime&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2019-12-18 15:56:56&quot;</span>
<span class="token punctuation">}</span>        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /products/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;牛仔&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;highlight&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;*&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="自定义高亮html标签" tabindex="-1"><a class="header-anchor" href="#自定义高亮html标签" aria-hidden="true">#</a> 自定义高亮html标签</h4><p>可以在highlight中使用pre_tags和post_tags</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /products/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;牛仔&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;highlight&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;post_tags&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&lt;/span&gt;&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> 
    <span class="token property">&quot;pre_tags&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&lt;span style=&#39;color:red&#39;&gt;&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;*&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>      
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="多字段高亮" tabindex="-1"><a class="header-anchor" href="#多字段高亮" aria-hidden="true">#</a> 多字段高亮</h4><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>
GET /products/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;牛仔&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;highlight&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;pre_tags&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&lt;font color=&#39;red&#39;&gt;&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;post_tags&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&lt;font/&gt;&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;require_field_match&quot;</span><span class="token operator">:</span> <span class="token string">&quot;false&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;desc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,108);function _(f,x){const t=o("ExternalLinkIcon");return i(),l("div",null,[c,n("ul",null,[n("li",null,[r,n("p",null,[s("常用字典数据结构："),n("a",d,[s("https://www.cnblogs.com/LBSer/p/4119841.html"),e(t)])])]),v,k,m]),q,n("p",null,[n("a",b,[s(" https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl.html"),e(t)])]),g,n("p",null,[s("注意：参数index.max_result_window主要用来限制单次查询满足查询条件的结果窗口的大小，窗口大小由from + size共同决定。不能简单理解成查询返回给调用方的数据量。这样做主要是为了限制"),n("a",y,[s("内存"),e(t)]),s("的消耗。")]),h])}const E=p(u,[["render",_],["__file","index.html.vue"]]);export{E as default};
