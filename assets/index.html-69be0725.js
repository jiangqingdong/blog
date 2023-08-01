import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as l,c as u,a as n,b as s,e as p,f as a}from"./app-21ce620e.js";const i={},c=a('<h2 id="相关性和相关性算分" tabindex="-1"><a class="header-anchor" href="#相关性和相关性算分" aria-hidden="true">#</a> 相关性和相关性算分</h2><p>搜索是用户和搜索引擎的对话，用户关心的是搜索结果的相关性</p><ul><li>是否可以找到所有相关的内容</li><li>有多少不相关的内容被返回了</li><li>文档的打分是否合理</li><li>结合业务需求，平衡结果排名</li></ul><p>如何衡量相关性：</p><ul><li>Precision(查准率)―尽可能返回较少的无关文档</li><li>Recall(查全率)–尽量返回较多的相关文档</li><li>Ranking -是否能够按照相关度进行排序</li></ul><h3 id="相关性-relevance" tabindex="-1"><a class="header-anchor" href="#相关性-relevance" aria-hidden="true">#</a> 相关性（Relevance）</h3><p>搜索的相关性算分，描述了一个文档和查询语句匹配的程度。ES 会对每个匹配查询条件的结果进行算分_score。打分的本质是排序，需要把最符合用户需求的文档排在前面。ES 5之前，默认的相关性算分采用TF-IDF，现在采用BM 25。</p><p>如下例子：显而易见，查询JAVA多线程设计模式，文档id为2,3的文档的算分更高</p><table><thead><tr><th>关键词</th><th>文档ID</th></tr></thead><tbody><tr><td>JAVA</td><td>1,2,3</td></tr><tr><td>设计模式</td><td>1,2,3,4,5,6</td></tr><tr><td>多线程</td><td>2,3,7,9</td></tr></tbody></table><h3 id="什么是tf-idf" tabindex="-1"><a class="header-anchor" href="#什么是tf-idf" aria-hidden="true">#</a> 什么是TF-IDF</h3><p>TF-IDF（term frequency–inverse document frequency）是一种用于信息检索与数据挖掘的常用加权技术。</p>',11),r=n("li",null,[n("p",null,"TF-IDF被公认为是信息检索领域最重要的发明，除了在信息检索，在文献分类和其他相关领域有着非常广泛的应用。")],-1),d=n("p",null,"IDF的概念，最早是剑桥大学的“斯巴克.琼斯”提出",-1),k=n("li",null,"1972年——“关键词特殊性的统计解释和它在文献检索中的应用”，但是没有从理论上解释IDF应该是用log(全部文档数/检索词出现过的文档总数)，而不是其他函数，也没有做进一步的研究",-1),v={href:"http://www.staff.city.ac.uk/~sb317/papers/foundations_bm25_review.pdf",target:"_blank",rel:"noopener noreferrer"},q=n("li",null,[n("p",null,"现代搜索引擎，对TF-IDF进行了大量细微的优化")],-1),m=a(`<p><strong>Lucene中的TF-IDF评分公式：</strong></p><p>​ <img src="https://img.jssjqd.cn//202305021449951.png" alt="image-20230502144913362" loading="lazy"></p><ul><li><strong>TF是词频(Term Frequency)</strong></li></ul><p>检索词在文档中出现的频率越高，相关性也越高。</p><ul><li><strong>IDF是逆向文本频率(Inverse Document Frequency)</strong></li></ul><p>每个检索词在索引中出现的频率，频率越高，相关性越低。</p><ul><li><strong>字段长度归一值（ field-length norm）</strong></li></ul><p>字段的长度是多少？字段越短，字段的权重越高。检索词出现在一个内容短的 title 要比同样的词出现在一个内容长的 content 字段权重更大。</p><p>以上三个因素——词频（term frequency）、逆向文档频率（inverse document frequency）和字段长度归一值（field-length norm）——是在索引时计算并存储的，最后将它们结合在一起计算单个词在特定文档中的权重。</p><h3 id="bm25" tabindex="-1"><a class="header-anchor" href="#bm25" aria-hidden="true">#</a> BM25</h3><p>BM25 就是对 TF-IDF 算法的改进，对于 TF-IDF 算法，TF(t) 部分的值越大，整个公式返回的值就会越大。BM25 就针对这点进行来优化，随着TF(t) 的逐步加大，该算法的返回值会趋于一个数值。</p><ul><li>从ES 5开始，默认算法改为BM 25</li><li>和经典的TF-IDF相比,当TF无限增加时，BM 25算分会趋于一个数值</li></ul><p>​ <img src="https://img.jssjqd.cn//202305021449171.png" alt="image-20230502144928179" loading="lazy"></p><ul><li>BM 25的公式</li></ul><p>​ <img src="https://img.jssjqd.cn//202305021707569.png" alt="" loading="lazy"></p><h3 id="通过explain-api查看tf-idf" tabindex="-1"><a class="header-anchor" href="#通过explain-api查看tf-idf" aria-hidden="true">#</a> 通过Explain API查看TF-IDF</h3><p>示例：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /test_score/_bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;content&quot;</span><span class="token operator">:</span><span class="token string">&quot;we use Elasticsearch to power the search&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;content&quot;</span><span class="token operator">:</span><span class="token string">&quot;we like elasticsearch&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;content&quot;</span><span class="token operator">:</span><span class="token string">&quot;Thre scoring of documents is caculated by the scoring formula&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;content&quot;</span><span class="token operator">:</span><span class="token string">&quot;you know,for search&quot;</span><span class="token punctuation">}</span>

GET /test_score/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;explain&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> 
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot;elasticsearch&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="boosting" tabindex="-1"><a class="header-anchor" href="#boosting" aria-hidden="true">#</a> Boosting</h3><p>Boosting是控制相关度的一种手段。</p><p>参数boost的含义：</p><ul><li>当boost &gt; 1时，打分的权重相对性提升</li><li>当0 &lt; boost &lt;1时，打分的权重相对性降低</li><li>当boost &lt;0时，贡献负分</li></ul><p>返回匹配positive查询的文档并降低匹配negative查询的文档相似度分。这样就可以在不排除某些文档的前提下对文档进行查询,搜索结果中存在只不过相似度分数相比正常匹配的要低;</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /test_score/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;boosting&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;positive&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot;elasticsearch&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;negative&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot;like&quot;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;negative_boost&quot;</span><span class="token operator">:</span> <span class="token number">0.2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用场景：希望包含了某项内容的结果不是不出现，而是排序靠后。</p><h2 id="布尔查询bool-query" tabindex="-1"><a class="header-anchor" href="#布尔查询bool-query" aria-hidden="true">#</a> 布尔查询bool Query</h2><p>一个bool查询,是一个或者多个查询子句的组合，总共包括4种子句，其中2种会影响算分，2种不影响算分。</p><ul><li>must: 相当于&amp;&amp; ，必须匹配，贡献算分</li><li>should: 相当于|| ，选择性匹配，贡献算分</li><li>must_not: 相当于! ，必须不能匹配，不贡献算分</li><li>filter: 必须匹配，不贡献算法</li></ul><p>在Elasticsearch中，有Query和 Filter两种不同的Context</p><ul><li>Query Context: 相关性算分</li><li>Filter Context: 不需要算分 ,可以利用Cache，获得更好的性能</li></ul><p>相关性并不只是全文本检索的专利，也适用于yes | no 的子句，匹配的子句越多，相关性评分</p><p>越高。如果多条查询子句被合并为一条复合查询语句，比如 bool查询，则每个查询子句计算得出的评分会被合并到总的相关性评分中。</p><p>bool查询语法</p><ul><li>子查询可以任意顺序出现</li><li>可以嵌套多个查询</li><li>如果你的bool查询中，没有must条件,should中必须至少满足一条查询</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;must&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;remark&quot;</span><span class="token operator">:</span> <span class="token string">&quot;java developer&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;sex&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;must_not&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token number">30</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;should&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;address.keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州天河公园&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;address.keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;广州白云山公园&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;minimum_should_match&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h3 id="如何解决结构化查询-包含而不是相等-的问题" tabindex="-1"><a class="header-anchor" href="#如何解决结构化查询-包含而不是相等-的问题" aria-hidden="true">#</a> 如何解决结构化查询“包含而不是相等”的问题</h3><p>测试数据</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employee/_bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;小明&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;interest&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;跑步&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;篮球&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;小红&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;interest&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;跑步&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方案： 增加count字段，使用bool查询解决</p><ul><li>从业务角度，按需改进Elasticsearch数据模型</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employee/_bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;小明&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;interest&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;跑步&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;篮球&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token property">&quot;interest_count&quot;</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;小红&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;interest&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;跑步&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token property">&quot;interest_count&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;小丽&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;interest&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;跳舞&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;唱歌&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;跑步&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token property">&quot;interest_count&quot;</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用bool查询</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># must 算分
POST /employee/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;must&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;interest.keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;跑步&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;interest_count&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
# filter不算分
POST /employee/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;interest.keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;跑步&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;interest_count&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h3 id="利用bool嵌套实现should-not逻辑" tabindex="-1"><a class="header-anchor" href="#利用bool嵌套实现should-not逻辑" aria-hidden="true">#</a> 利用bool嵌套实现should not逻辑</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;must&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;remark&quot;</span><span class="token operator">:</span> <span class="token string">&quot;java developer&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;should&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;must_not&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                  <span class="token property">&quot;sex&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;minimum_should_match&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="boosting-query" tabindex="-1"><a class="header-anchor" href="#boosting-query" aria-hidden="true">#</a> Boosting Query</h2><p>思考： 如何控制查询的相关性算分？</p><h3 id="控制字段的boosting" tabindex="-1"><a class="header-anchor" href="#控制字段的boosting" aria-hidden="true">#</a> 控制字段的Boosting</h3><p>Boosting是控制相关的一种手段。可以通过指定字段的boost值影响查询结果</p><p>参数boost的含义：</p><ul><li>当boost &gt; 1时，打分的权重相对性提升</li><li>当0 &lt; boost &lt;1时，打分的权重相对性降低</li><li>当boost &lt;0时，贡献负分</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /blogs/_bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;title&quot;</span><span class="token operator">:</span><span class="token string">&quot;Apple iPad&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;content&quot;</span><span class="token operator">:</span><span class="token string">&quot;Apple iPad,Apple iPad&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;title&quot;</span><span class="token operator">:</span><span class="token string">&quot;Apple iPad,Apple iPad&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;content&quot;</span><span class="token operator">:</span><span class="token string">&quot;Apple iPad&quot;</span><span class="token punctuation">}</span>

GET /blogs/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;should&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;apple,ipad&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;boost&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;apple,ipad&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;boost&quot;</span><span class="token operator">:</span> <span class="token number">4</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><p>案例：要求苹果公司的产品信息优先展示</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /news/_bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;content&quot;</span><span class="token operator">:</span><span class="token string">&quot;Apple Mac&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;content&quot;</span><span class="token operator">:</span><span class="token string">&quot;Apple iPad&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;content&quot;</span><span class="token operator">:</span><span class="token string">&quot;Apple employee like Apple Pie and Apple Juice&quot;</span><span class="token punctuation">}</span>


GET /news/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;must&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot;apple&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>利用must not排除不是苹果公司产品的文档</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /news/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;must&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot;apple&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;must_not&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pie&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>利用negative_boost降低相关性</strong></p><ul><li>negative_boost 对 negative部分query生效</li><li>计算评分时,boosting部分评分不修改，negative部分query乘以negative_boost值</li><li>negative_boost取值:0-1.0，举例:0.3</li></ul><p>对某些返回结果不满意，但又不想排除掉（ must_not)，可以考虑boosting query的negative_boost。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /news/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;boosting&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;positive&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot;apple&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;negative&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pie&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;negative_boost&quot;</span><span class="token operator">:</span> <span class="token number">0.2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单字符串多字段查询" tabindex="-1"><a class="header-anchor" href="#单字符串多字段查询" aria-hidden="true">#</a> 单字符串多字段查询</h2><h3 id="三种场景" tabindex="-1"><a class="header-anchor" href="#三种场景" aria-hidden="true">#</a> 三种场景</h3><ul><li><strong>最佳字段(Best Fields)</strong></li></ul><p>当字段之间相互竞争，又相互关联。例如，对于博客的 title和 body这样的字段，评分来自最匹配字段</p><ul><li><strong>多数字段(Most Fields)</strong></li></ul><p>处理英文内容时的一种常见的手段是，在主字段( English Analyzer)，抽取词干，加入同义词，以</p><p>匹配更多的文档。相同的文本，加入子字段（Standard Analyzer），以提供更加精确的匹配。其他字段作为匹配文档提高相关度的信号，匹配字段越多则越好。</p><ul><li><strong>混合字段(Cross Field)</strong></li></ul><p>对于某些实体，例如人名，地址，图书信息。需要在多个字段中确定信息，单个字段只能作为整体的一部分。希望在任何这些列出的字段中找到尽可能多的词</p><h3 id="最佳字段查询dis-max-query" tabindex="-1"><a class="header-anchor" href="#最佳字段查询dis-max-query" aria-hidden="true">#</a> 最佳字段查询Dis Max Query</h3><p>将任何与任一查询匹配的文档作为结果返回，采用字段上最匹配的评分最终评分返回。</p>`,74),b={href:"https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl-dis-max-query.html",target:"_blank",rel:"noopener noreferrer"},y=a(`<p>测试</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /blogs/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Quick brown rabbits&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;body&quot;</span><span class="token operator">:</span>  <span class="token string">&quot;Brown rabbits are commonly seen.&quot;</span>
<span class="token punctuation">}</span>

PUT /blogs/_doc/<span class="token number">2</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Keeping pets healthy&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;body&quot;</span><span class="token operator">:</span>  <span class="token string">&quot;My quick brown fox eats rabbits on a regular basis.&quot;</span>
<span class="token punctuation">}</span>

POST /blogs/_search
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;should&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Brown fox&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;body&quot;</span><span class="token operator">:</span>  <span class="token string">&quot;Brown fox&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>思考：查询结果不符合预期，为什么？<img src="https://img.jssjqd.cn//202305021509366.png" alt="image-20230502150928420" loading="lazy"></p><p><strong>bool should的算法过程：</strong></p><ul><li>查询should语句中的两个查询</li><li>加和两个查询的评分</li><li>乘以匹配语句的总数</li><li>除以所有语句的总数</li></ul><p>上述例子中，title和body属于竞争关系，不应该讲分数简单叠加，而是应该找到单个最佳匹配的字段的评分。</p><p><strong>使用最佳字段查询dis max query</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST blogs/_search
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;dis_max&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;queries&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Brown fox&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;body&quot;</span><span class="token operator">:</span>  <span class="token string">&quot;Brown fox&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>可以通过tie_breaker参数调整</strong></p><p>Tier Breaker是一个介于0-1之间的浮点数。0代表使用最佳匹配;1代表所有语句同等重要。</p><ol><li>获得最佳匹配语句的评分_score 。</li><li>将其他匹配语句的评分与tie_breaker相乘</li><li>对以上评分求和并规范化</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /blogs/_search
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;dis_max&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;queries&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Quick pets&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;body&quot;</span><span class="token operator">:</span>  <span class="token string">&quot;Quick pets&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


POST /blogs/_search
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;dis_max&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;queries&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Quick pets&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;body&quot;</span><span class="token operator">:</span>  <span class="token string">&quot;Quick pets&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">&quot;tie_breaker&quot;</span><span class="token operator">:</span> <span class="token number">0.2</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="multi-match-query" tabindex="-1"><a class="header-anchor" href="#multi-match-query" aria-hidden="true">#</a> Multi Match Query</h3><p><strong>最佳字段(Best Fields)搜索</strong></p><p>Best Fields是默认类型，可以不用指定</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /blogs/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;best_fields&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Quick pets&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;body&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;tie_breaker&quot;</span><span class="token operator">:</span> <span class="token number">0.2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用多数字段（Most Fields）搜索</strong></p><p>案例</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE /titles
PUT /titles
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;english&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;std&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;standard&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST titles/_bulk
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;My dog barks&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;I see a lot of barking dogs on the road &quot;</span> <span class="token punctuation">}</span>

# 结果与预期不匹配
GET /titles/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;barking dogs&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用广度匹配字段title包括尽可能多的文档——以提升召回率——同时又使用字段title.std 作为信号将相关度更高的文档置于结果顶部。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /titles/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;barking dogs&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;most_fields&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;title&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;title.std&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个字段对于最终评分的贡献可以通过自定义值boost 来控制。比如，使title 字段更为重要,这样同时也降低了其他信号字段的作用：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#增加title的权重
GET /titles/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;barking dogs&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;most_fields&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;title^10&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;title.std&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>跨字段（Cross Field）搜索</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE /address
PUT /address
<span class="token punctuation">{</span>
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

#使用most_fields的方式结果不符合预期，不支持operator
GET /address/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;湖南常德&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;most_fields&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;province&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

# 可以使用cross_fields，支持operator
#与copy_to相比，其中一个优势就是它可以在搜索时为单个字段提升权重。
GET /address/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;湖南常德&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cross_fields&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;operator&quot;</span><span class="token operator">:</span> <span class="token string">&quot;and&quot;</span><span class="token punctuation">,</span> 
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;province&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以用copy...to 解决，但是需要额外的存储空间</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE /address

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

GET /address/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;湖南常德&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;most_fields&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;province&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;city&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="elasticsearch聚合操作" tabindex="-1"><a class="header-anchor" href="#elasticsearch聚合操作" aria-hidden="true">#</a> ElasticSearch聚合操作</h2>`,28),g={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html",target:"_blank",rel:"noopener noreferrer"},h=a(`<ul><li>什么品牌的手机最受欢迎？</li><li>这些手机的平均价格、最高价格、最低价格？</li><li>这些手机每月的销售情况如何？</li></ul><p>语法：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;aggs&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  #和query同级的关键词
    <span class="token property">&quot;&lt;aggregation_name&gt;&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> #自定义的聚合名字
        <span class="token property">&quot;&lt;aggregation_type&gt;&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> #聚合的定义： 不同的type+body
            &lt;aggregation_body&gt;
        <span class="token punctuation">}</span>
        <span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token property">&quot;meta&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token punctuation">[</span>&lt;meta_data_body&gt;<span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>?
        <span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token property">&quot;aggregations&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>&lt;sub_aggregation&gt;<span class="token punctuation">]</span>+ <span class="token punctuation">}</span> <span class="token punctuation">]</span>?  #子聚合查询
    <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token property">&quot;&lt;aggregation_name_2&gt;&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span> <span class="token punctuation">]</span>*  #可以包含多个同级的聚合查询
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="聚合的分类" tabindex="-1"><a class="header-anchor" href="#聚合的分类" aria-hidden="true">#</a> <strong>聚合的分类</strong></h3><ul><li>Metric Aggregation：—些数学运算，可以对文档字段进行统计分析，类比Mysql中的 min(), max(), sum() 操作。</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>SELECT MIN(price)<span class="token punctuation">,</span> MAX(price) FROM products
#Metric聚合的DSL类比实现：
<span class="token punctuation">{</span>
    <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;avg_price&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
                <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;price&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Bucket Aggregation： 一些满足特定条件的文档的集合放置到一个桶里，每一个桶关联一个key，类比Mysql中的group by操作。</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>ELECT size COUNT(*) FROM products GROUP BY size
#bucket聚合的DSL类比实现：
<span class="token punctuation">{</span>
 <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;by_size&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;size&quot;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Pipeline Aggregation：对其他的聚合结果进行二次聚合</li></ul><p>示例数据</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE /employees
#创建索引库
PUT /employees
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;integer&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
         <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;fields&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;keyword&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;ignore_above&quot;</span> <span class="token operator">:</span> <span class="token number">50</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;integer&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT /employees/_bulk
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Emma&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Product Manager&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">35000</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Underwood&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">41</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Dev Manager&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">50000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;3&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Tran&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">25</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Web Designer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">18000</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;4&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Rivera&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">26</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Web Designer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">22000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;5&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Rose&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">25</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;QA&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">18000</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;6&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Lucy&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">31</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;QA&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">25000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;7&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Byrd&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">27</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;QA&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">20000</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;8&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Foster&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">27</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">20000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;9&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Gregory&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">22000</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;10&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Bryant&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;11&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Jenny&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">36</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">38000</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;12&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Mcdonald&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">31</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">32000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;13&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Jonthna&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">30</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">30000</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;14&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Marshall&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Javascript Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">25000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;15&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;King&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">33</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">28000</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;16&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Mccarthy&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">21</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Javascript Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">16000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;17&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Goodwin&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">25</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Javascript Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">16000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;18&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Catherine&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">29</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Javascript Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">20000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;19&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Boone&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">30</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;DBA&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">30000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;20&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Kathy&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">29</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;DBA&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token number">20000</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="metric-aggregation" tabindex="-1"><a class="header-anchor" href="#metric-aggregation" aria-hidden="true">#</a> <strong>Metric Aggregation</strong></h3><ul><li><p>单值分析︰只输出一个分析结果</p></li><li><ul><li>min, max, avg, sum</li><li>Cardinality（类似distinct Count)</li></ul></li><li><p>多值分析:输出多个分析结果</p></li><li><p>stats（统计）, extended stats</p></li><li><p>percentile （百分位）, percentile rank</p></li><li><p>top hits(排在前面的示例)</p></li></ul><p>查询员工的最低最高和平均工资</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#多个 Metric 聚合，找到最低最高和平均工资
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;max_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;max&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;min_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;min&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对salary进行统计</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># 一个聚合，输出多值
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;stats_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>cardinate对搜索结果去重</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;cardinate&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;cardinality&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bucket-aggregation" tabindex="-1"><a class="header-anchor" href="#bucket-aggregation" aria-hidden="true">#</a> Bucket Aggregation</h3><p>按照一定的规则，将文档分配到不同的桶中，从而达到分类的目的。ES提供的一些常见的 Bucket Aggregation。</p><ul><li><p>Terms，需要字段支持filedata</p><ul><li>keyword 默认支持fielddata</li><li>text需要在Mapping 中开启fielddata，会按照分词后的结果进行分桶</li></ul></li><li><p>数字类型</p><ul><li>Range / Data Range</li><li>Histogram（直方图） / Date Histogram</li></ul></li><li><p>支持嵌套: 也就在桶里再做分桶</p></li></ul><p><strong>获取job的分类信息</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># 对keword 进行聚合
GET /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>聚合可配置属性有：</p><ul><li>field：指定聚合字段</li><li>size：指定聚合结果数量</li><li>order：指定聚合结果排序方式</li></ul><p>默认情况下，Bucket聚合会统计Bucket内的文档数量，记为_count，并且按照_count降序排序。我们可以指定order属性，自定义聚合的排序方式：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
         <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;_count&quot;</span><span class="token operator">:</span> <span class="token string">&quot;desc&quot;</span> 
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>限定聚合范围</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#只对salary在<span class="token number">10000</span>元以上的文档聚合
GET /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token number">10000</span> 
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> 
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
         <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;_count&quot;</span><span class="token operator">:</span> <span class="token string">&quot;desc&quot;</span> 
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：对 Text 字段进行 terms 聚合查询，会失败抛出异常</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://img.jssjqd.cn//202305021736471.png" alt="image-20230502173621577" tabindex="0" loading="lazy"><figcaption>image-20230502173621577</figcaption></figure><p>解决办法：对 Text 字段打开 fielddata，支持terms aggregation</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /employees/_mapping
<span class="token punctuation">{</span>
  <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
       <span class="token property">&quot;type&quot;</span><span class="token operator">:</span>  <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
       <span class="token property">&quot;fielddata&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

# 对 Text 字段进行分词，分词后的terms
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对job.keyword 和 job 进行 terms 聚合，分桶的总数并不一样</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;cardinate&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;cardinality&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Range &amp; Histogram聚合</strong></p><ul><li>按照数字的范围，进行分桶</li><li>在Range Aggregation中，可以自定义Key</li></ul><p>Range 示例：按照工资的 Range 分桶</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>Salary Range分桶，可以自己定义 key
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;salary_range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;salary&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ranges&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;to&quot;</span><span class="token operator">:</span><span class="token number">10000</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;from&quot;</span><span class="token operator">:</span><span class="token number">10000</span><span class="token punctuation">,</span>
            <span class="token property">&quot;to&quot;</span><span class="token operator">:</span><span class="token number">20000</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;key&quot;</span><span class="token operator">:</span><span class="token string">&quot;&gt;20000&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;from&quot;</span><span class="token operator">:</span><span class="token number">20000</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Histogram示例：按照工资的间隔分桶</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#工资<span class="token number">0</span>到<span class="token number">10</span>万，以 <span class="token number">5000</span>一个区间进行分桶
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;salary_histrogram&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;histogram&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;salary&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;interval&quot;</span><span class="token operator">:</span><span class="token number">5000</span><span class="token punctuation">,</span>
        <span class="token property">&quot;extended_bounds&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;min&quot;</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">,</span>
          <span class="token property">&quot;max&quot;</span><span class="token operator">:</span><span class="token number">100000</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>top_hits应用场景: 当获取分桶后，桶内最匹配的顶部文档列表</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># 指定size，不同工种中，年纪最大的<span class="token number">3</span>个员工的具体信息
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;old_employee&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;top_hits&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;size&quot;</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">,</span>
            <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
                  <span class="token property">&quot;order&quot;</span><span class="token operator">:</span><span class="token string">&quot;desc&quot;</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>嵌套聚合示例</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># 嵌套聚合<span class="token number">1</span>，按照工作类型分桶，并统计工资信息
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;Job_salary_stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

# 多次嵌套。根据工作类型分桶，然后按照性别分桶，计算工资的统计信息
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;Job_gender_stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gender_stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;gender&quot;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;salary_stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pipeline-aggregation" tabindex="-1"><a class="header-anchor" href="#pipeline-aggregation" aria-hidden="true">#</a> Pipeline Aggregation</h3><p>支持对聚合分析的结果，再次进行聚合分析。</p><p>Pipeline 的分析结果会输出到原结果中，根据位置的不同，分为两类：</p><ul><li><p>Sibling - 结果和现有分析结果同级</p></li><li><ul><li>Max，min，Avg &amp; Sum Bucket</li><li>Stats，Extended Status Bucket</li><li>Percentiles Bucket</li></ul></li><li><p>Parent -结果内嵌到现有的聚合分析结果之中</p></li><li><ul><li>Derivative(求导)</li><li>Cumultive Sum(累计求和)</li><li>Moving Function(移动平均值 )</li></ul></li></ul><p><strong>min_bucket示例</strong></p><p>在员工数最多的工种里，找出平均工资最低的工种</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># 平均工资最低的工种
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;min_salary_by_job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>   
      <span class="token property">&quot;min_bucket&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>    
        <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jobs&gt;avg_salary&quot;</span>  
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>min_salary_by_job结果和jobs的聚合同级</li><li>min_bucket求之前结果的最小值</li><li>通过bucket_path关键字指定路径</li></ul><p><strong>Stats示例</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># 平均工资的统计分析
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;stats_salary_by_job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;stats_bucket&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jobs&gt;avg_salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>percentiles示例</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># 平均工资的百分位数
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;percentiles_salary_by_job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;percentiles_bucket&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jobs&gt;avg_salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Cumulative_sum示例</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#Cumulative_sum   累计求和
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;histogram&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;min_doc_count&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;interval&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;cumulative_salary&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;cumulative_sum&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;avg_salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="聚合的作用范围" tabindex="-1"><a class="header-anchor" href="#聚合的作用范围" aria-hidden="true">#</a> 聚合的作用范围</h3><p>ES聚合分析的默认作用范围是query的查询结果集，同时ES还支持以下方式改变聚合的作用范围：</p><ul><li>Filter</li><li>Post Filter</li><li>Global</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#Query
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token number">20</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>
        
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

#Filter
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;older_person&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;range&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;from&quot;</span><span class="token operator">:</span><span class="token number">35</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
         <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
           <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;all_jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>
        
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



#Post field. 一条语句，找出所有的job类型。还能找到聚合后符合条件的结果
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;post_filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;job.keyword&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Dev Manager&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


#global 
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token number">40</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>
        
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token property">&quot;all&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;global&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;salary_avg&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="排序" tabindex="-1"><a class="header-anchor" href="#排序" aria-hidden="true">#</a> 排序</h3><p>指定order，按照count和key进行排序：</p><ul><li>默认情况，按照count降序排序</li><li>指定size，就能返回相应的桶</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#排序 order
#count and key
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token number">20</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;order&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
          <span class="token punctuation">{</span><span class="token property">&quot;_count&quot;</span><span class="token operator">:</span><span class="token string">&quot;asc&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span><span class="token property">&quot;_key&quot;</span><span class="token operator">:</span><span class="token string">&quot;desc&quot;</span><span class="token punctuation">}</span>
          <span class="token punctuation">]</span>
        
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


#排序 order
#count and key
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;order&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>  <span class="token punctuation">{</span>
            <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span><span class="token string">&quot;desc&quot;</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        
        
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;salary&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


#排序 order
#count and key
POST employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;order&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>  <span class="token punctuation">{</span>
            <span class="token property">&quot;stats_salary.min&quot;</span><span class="token operator">:</span><span class="token string">&quot;desc&quot;</span>
          <span class="token punctuation">}</span><span class="token punctuation">]</span>
        
        
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;stats_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;salary&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="es聚合分析不精准原因分析" tabindex="-1"><a class="header-anchor" href="#es聚合分析不精准原因分析" aria-hidden="true">#</a> ES聚合分析不精准原因分析</h3><p>ElasticSearch在对海量数据进行聚合分析的时候会损失搜索的精准度来满足实时性的需求。</p><p>​ <img src="https://img.jssjqd.cn//202305021740280.png" alt="image-20230502174019035" loading="lazy"></p><p>Terms聚合分析的执行流程：</p><p>​ <img src="https://img.jssjqd.cn//202305021740384.png" alt="image-20230502174023595" loading="lazy"></p><p>不精准的原因： 数据分散到多个分片，聚合是每个分片的取 Top X，导致结果不精准。ES 可以不每个分片Top X，而是全量聚合，但势必这会有很大的性能问题。</p><p>​ <img src="https://img.jssjqd.cn//202305021740763.png" alt="image-20230502174027799" loading="lazy"></p><p><strong>思考：如何提高聚合精确度？</strong></p><p><strong>方案1：设置主分片为1</strong></p><p>注意7.x版本已经默认为1。</p><p>适用场景：数据量小的小集群规模业务场景。</p><p><strong>方案2：调大 shard_size 值</strong></p><p>设置 shard_size 为比较大的值，官方推荐：size*1.5+10。shard_size 值越大，结果越趋近于精准聚合结果值。此外，还可以通过show_term_doc_count_error参数显示最差情况下的错误值，用于辅助确定 shard_size 大小。</p><ul><li>size：是聚合结果的返回值，客户期望返回聚合排名前三，size值就是 3。</li><li>shard_size: 每个分片上聚合的数据条数。shard_size 原则上要大于等于 size</li></ul><p>适用场景：数据量大、分片数多的集群业务场景。</p><p>测试： 使用kibana的测试数据</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE my_flights
PUT my_flights
<span class="token punctuation">{</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;number_of_shards&quot;</span><span class="token operator">:</span> <span class="token number">20</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;AvgTicketPrice&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;float&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Cancelled&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;boolean&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Carrier&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Dest&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;DestAirportID&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;DestCityName&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;DestCountry&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;DestLocation&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;geo_point&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;DestRegion&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;DestWeather&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;DistanceKilometers&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;float&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;DistanceMiles&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;float&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;FlightDelay&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;boolean&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;FlightDelayMin&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;integer&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;FlightDelayType&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;FlightNum&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;FlightTimeHour&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;FlightTimeMin&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;float&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Origin&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;OriginAirportID&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;OriginCityName&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;OriginCountry&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;OriginLocation&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;geo_point&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;OriginRegion&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;OriginWeather&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;dayOfWeek&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;integer&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;timestamp&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;date&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST _reindex
<span class="token punctuation">{</span>
  <span class="token property">&quot;source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;kibana_sample_data_flights&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my_flights&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET my_flights/_count
GET kibana_sample_data_flights/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;weather&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;OriginWeather&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span><span class="token number">5</span><span class="token punctuation">,</span>
        <span class="token property">&quot;show_term_doc_count_error&quot;</span><span class="token operator">:</span><span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET my_flights/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;weather&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;OriginWeather&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span><span class="token number">5</span><span class="token punctuation">,</span>
        <span class="token property">&quot;shard_size&quot;</span><span class="token operator">:</span><span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token property">&quot;show_term_doc_count_error&quot;</span><span class="token operator">:</span><span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Terms Aggregation的返回中有两个特殊的数值：</p><ul><li><p>doc_count_error_upper_bound : 被遗漏的term 分桶，包含的文档，有可能的最大值</p></li><li><p>sum_other_doc_count: 除了返回结果 bucket的terms以外，其他 terms 的文档总数（总数-返回的总数)</p></li></ul><p><strong>方案3：将size设置为全量值，来解决精度问题</strong></p><p>将size设置为2的32次方减去1也就是分片支持的最大值，来解决精度问题。</p><p>原因：1.x版本，size等于 0 代表全部，高版本取消 0 值，所以设置了最大值（大于业务的全量值）。</p><p>全量带来的弊端就是：如果分片数据量极大，这样做会耗费巨大的CPU 资源来排序，而且可能会阻塞网络。</p><p>适用场景：对聚合精准度要求极高的业务场景，由于性能问题，不推荐使用。</p><p><strong>方案4：使用Clickhouse/ Spark 进行精准聚合</strong></p><p>适用场景：数据量非常大、聚合精度要求高、响应速度快的业务场景。</p><h2 id="elasticsearch-聚合性能优化" tabindex="-1"><a class="header-anchor" href="#elasticsearch-聚合性能优化" aria-hidden="true">#</a> Elasticsearch 聚合性能优化</h2><h3 id="启用-eager-global-ordinals-提升高基数聚合性能" tabindex="-1"><a class="header-anchor" href="#启用-eager-global-ordinals-提升高基数聚合性能" aria-hidden="true">#</a> 启用 eager global ordinals 提升高基数聚合性能</h3><p>适用场景：高基数聚合 。高基数聚合场景中的高基数含义：一个字段包含很大比例的唯一值。</p><p>global ordinals 中文翻译成全局序号，是一种数据结构，应用场景如下：</p><ul><li>基于 keyword，ip 等字段的分桶聚合，包含：terms聚合、composite 聚合等。</li><li>基于text 字段的分桶聚合（前提条件是：fielddata 开启）。</li><li>基于父子文档 Join 类型的 has_child 查询和 父聚合。</li></ul><p>global ordinals 使用一个数值代表字段中的字符串值，然后为每一个数值分配一个 bucket（分桶）。</p><p>global ordinals 的本质是：启用 eager_global_ordinals 时，会在刷新（refresh）分片时构建全局序号。这将构建全局序号的成本从搜索阶段转移到了数据索引化（写入）阶段。</p><p>创建索引的同时开启：eager_global_ordinals。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /my-index
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;tags&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;eager_global_ordinals&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：开启 eager_global_ordinals 会影响写入性能，因为每次刷新时都会创建新的全局序号。为了最大程度地减少由于频繁刷新建立全局序号而导致的额外开销，请调大刷新间隔 refresh_interval。</p><p>动态调整刷新频率的方法如下：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT my-index/_settings
<span class="token punctuation">{</span>
  <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;refresh_interval&quot;</span><span class="token operator">:</span> <span class="token string">&quot;30s&quot;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该招数的本质是：以空间换时间。</p><h3 id="插入数据时对索引进行预排序" tabindex="-1"><a class="header-anchor" href="#插入数据时对索引进行预排序" aria-hidden="true">#</a> 插入数据时对索引进行预排序</h3><ul><li>Index sorting （索引排序）可用于在插入时对索引进行预排序，而不是在查询时再对索引进行排序，这将提高范围查询（range query）和排序操作的性能。</li><li>在 Elasticsearch 中创建新索引时，可以配置如何对每个分片内的段进行排序。</li><li>这是 Elasticsearch 6.X 之后版本才有的特性。</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /my_index
<span class="token punctuation">{</span>
  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;sort.field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;create_time&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sort.order&quot;</span><span class="token operator">:</span> <span class="token string">&quot;desc&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;create_time&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;date&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：预排序将增加 Elasticsearch 写入的成本。在某些用户特定场景下，开启索引预排序会导致大约 40%-50% 的写性能下降。也就是说，如果用户场景更关注写性能的业务，开启索引预排序不是一个很好的选择。</p><h3 id="使用节点查询缓存" tabindex="-1"><a class="header-anchor" href="#使用节点查询缓存" aria-hidden="true">#</a> <strong>使用节点查询缓存</strong></h3><p>节点查询缓存（Node query cache）可用于有效缓存过滤器（filter）操作的结果。如果多次执行同一 filter 操作，这将很有效，但是即便更改过滤器中的某一个值，也将意味着需要计算新的过滤器结果。</p><p>例如，由于 “now” 值一直在变化，因此无法缓存在过滤器上下文中使用 “now” 的查询。</p><p>那怎么使用缓存呢？通过在 now 字段上应用 datemath 格式将其四舍五入到最接近的分钟/小时等，可以使此类请求更具可缓存性，以便可以对筛选结果进行缓存。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT /my_index/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;create_time&quot;</span><span class="token operator">:</span><span class="token string">&quot;2022-05-11T16:30:55.328Z&quot;</span>
<span class="token punctuation">}</span>

#下面的示例无法使用缓存
GET /my_index/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;constant_score&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;create_time&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token string">&quot;now-1h&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;lte&quot;</span><span class="token operator">:</span> <span class="token string">&quot;now&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

# 下面的示例就可以使用节点查询缓存。
GET /my_index/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;constant_score&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;create_time&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token string">&quot;now-1h/m&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;lte&quot;</span><span class="token operator">:</span> <span class="token string">&quot;now/m&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述示例中的“now-1h/m” 就是 datemath 的格式。</p><p>如果当前时间 now 是：16:31:29，那么range query 将匹配 my_date 介于：15:31:00 和 15:31:59 之间的时间数据。同理，聚合的前半部分 query 中如果有基于时间查询，或者后半部分 aggs 部分中有基于时间聚合的，建议都使用 datemath 方式做缓存处理以优化性能。</p><h3 id="使用分片请求缓存" tabindex="-1"><a class="header-anchor" href="#使用分片请求缓存" aria-hidden="true">#</a> 使用分片请求缓存</h3><p>聚合语句中，设置：size：0，就会使用分片请求缓存缓存结果。size = 0 的含义是：只返回聚合结果，不返回查询结果。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /es_db/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;remark_agg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;remark.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拆分聚合-使聚合并行化" tabindex="-1"><a class="header-anchor" href="#拆分聚合-使聚合并行化" aria-hidden="true">#</a> 拆分聚合，使聚合并行化</h3><p>Elasticsearch 查询条件中同时有多个条件聚合，默认情况下聚合不是并行运行的。当为每个聚合提供自己的查询并执行 msearch 时，性能会有显著提升。因此，在 CPU 资源不是瓶颈的前提下，如果想缩短响应时间，可以将多个聚合拆分为多个查询，借助：msearch 实现并行聚合。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>#常规的多条件聚合实现
GET /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;job_agg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_salary&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;max&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
# msearch 拆分多个语句的聚合实现
GET _msearch
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token string">&quot;employees&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;size&quot;</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;job_agg&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;terms&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token string">&quot;employees&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;size&quot;</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;max_salary&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;max&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>`,126);function _(j,x){const t=e("ExternalLinkIcon");return l(),u("div",null,[c,n("ul",null,[r,n("li",null,[d,n("ul",null,[k,n("li",null,[s("1970，1980年代萨尔顿和罗宾逊，进行了进一步的证明和研究，并用香农信息论做了证明"),n("a",v,[s("http://www.staff.city.ac.uk/~sb317/papers/foundations_bm25_review.pdf"),p(t)])])])]),q]),m,n("p",null,[s("官方文档："),n("a",b,[s("https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl-dis-max-query.html"),p(t)])]),y,n("p",null,[s("Elasticsearch除搜索以外，提供了针对ES 数据进行统计分析的功能。"),n("a",g,[s("聚合(aggregations)"),p(t)]),s("可以让我们极其方便的实现对数据的统计、分析、运算。例如：")]),h])}const w=o(i,[["render",_],["__file","index.html.vue"]]);export{w as default};
