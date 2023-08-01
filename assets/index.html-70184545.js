const e=JSON.parse('{"key":"v-08d39184","path":"/pages/f9f747/","title":"ElasticSearch搜索技术深入与聚合查询实战","lang":"zh-CN","frontmatter":{"title":"ElasticSearch搜索技术深入与聚合查询实战","date":"2023-05-04T07:36:32.000Z","permalink":"/pages/f9f747/","author":{"name":"江"},"category":["ElasticSearch"],"description":"相关性和相关性算分 搜索是用户和搜索引擎的对话，用户关心的是搜索结果的相关性 是否可以找到所有相关的内容 有多少不相关的内容被返回了 文档的打分是否合理 结合业务需求，平衡结果排名 如何衡量相关性： Precision(查准率)―尽可能返回较少的无关文档 Recall(查全率)–尽量返回较多的相关文档 Ranking -是否能够按照相关度进行排序 相关性（Relevance）","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/pages/f9f747/"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"ElasticSearch搜索技术深入与聚合查询实战"}],["meta",{"property":"og:description","content":"相关性和相关性算分 搜索是用户和搜索引擎的对话，用户关心的是搜索结果的相关性 是否可以找到所有相关的内容 有多少不相关的内容被返回了 文档的打分是否合理 结合业务需求，平衡结果排名 如何衡量相关性： Precision(查准率)―尽可能返回较少的无关文档 Recall(查全率)–尽量返回较多的相关文档 Ranking -是否能够按照相关度进行排序 相关性（Relevance）"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-01T18:24:48.000Z"}],["meta",{"property":"article:author","content":"江"}],["meta",{"property":"article:published_time","content":"2023-05-04T07:36:32.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-01T18:24:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ElasticSearch搜索技术深入与聚合查询实战\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-04T07:36:32.000Z\\",\\"dateModified\\":\\"2023-08-01T18:24:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"江\\"}]}"]]},"headers":[{"level":2,"title":"相关性和相关性算分","slug":"相关性和相关性算分","link":"#相关性和相关性算分","children":[{"level":3,"title":"相关性（Relevance）","slug":"相关性-relevance","link":"#相关性-relevance","children":[]},{"level":3,"title":"什么是TF-IDF","slug":"什么是tf-idf","link":"#什么是tf-idf","children":[]},{"level":3,"title":"BM25","slug":"bm25","link":"#bm25","children":[]},{"level":3,"title":"通过Explain API查看TF-IDF","slug":"通过explain-api查看tf-idf","link":"#通过explain-api查看tf-idf","children":[]},{"level":3,"title":"Boosting","slug":"boosting","link":"#boosting","children":[]}]},{"level":2,"title":"布尔查询bool Query","slug":"布尔查询bool-query","link":"#布尔查询bool-query","children":[{"level":3,"title":"如何解决结构化查询“包含而不是相等”的问题","slug":"如何解决结构化查询-包含而不是相等-的问题","link":"#如何解决结构化查询-包含而不是相等-的问题","children":[]},{"level":3,"title":"利用bool嵌套实现should not逻辑","slug":"利用bool嵌套实现should-not逻辑","link":"#利用bool嵌套实现should-not逻辑","children":[]}]},{"level":2,"title":"Boosting Query","slug":"boosting-query","link":"#boosting-query","children":[{"level":3,"title":"控制字段的Boosting","slug":"控制字段的boosting","link":"#控制字段的boosting","children":[]}]},{"level":2,"title":"单字符串多字段查询","slug":"单字符串多字段查询","link":"#单字符串多字段查询","children":[{"level":3,"title":"三种场景","slug":"三种场景","link":"#三种场景","children":[]},{"level":3,"title":"最佳字段查询Dis Max Query","slug":"最佳字段查询dis-max-query","link":"#最佳字段查询dis-max-query","children":[]},{"level":3,"title":"Multi Match Query","slug":"multi-match-query","link":"#multi-match-query","children":[]}]},{"level":2,"title":"ElasticSearch聚合操作","slug":"elasticsearch聚合操作","link":"#elasticsearch聚合操作","children":[{"level":3,"title":"聚合的分类","slug":"聚合的分类","link":"#聚合的分类","children":[]},{"level":3,"title":"Metric Aggregation","slug":"metric-aggregation","link":"#metric-aggregation","children":[]},{"level":3,"title":"Bucket Aggregation","slug":"bucket-aggregation","link":"#bucket-aggregation","children":[]},{"level":3,"title":"Pipeline Aggregation","slug":"pipeline-aggregation","link":"#pipeline-aggregation","children":[]},{"level":3,"title":"聚合的作用范围","slug":"聚合的作用范围","link":"#聚合的作用范围","children":[]},{"level":3,"title":"排序","slug":"排序","link":"#排序","children":[]},{"level":3,"title":"ES聚合分析不精准原因分析","slug":"es聚合分析不精准原因分析","link":"#es聚合分析不精准原因分析","children":[]}]},{"level":2,"title":"Elasticsearch 聚合性能优化","slug":"elasticsearch-聚合性能优化","link":"#elasticsearch-聚合性能优化","children":[{"level":3,"title":"启用 eager global ordinals 提升高基数聚合性能","slug":"启用-eager-global-ordinals-提升高基数聚合性能","link":"#启用-eager-global-ordinals-提升高基数聚合性能","children":[]},{"level":3,"title":"插入数据时对索引进行预排序","slug":"插入数据时对索引进行预排序","link":"#插入数据时对索引进行预排序","children":[]},{"level":3,"title":"使用节点查询缓存","slug":"使用节点查询缓存","link":"#使用节点查询缓存","children":[]},{"level":3,"title":"使用分片请求缓存","slug":"使用分片请求缓存","link":"#使用分片请求缓存","children":[]},{"level":3,"title":"拆分聚合，使聚合并行化","slug":"拆分聚合-使聚合并行化","link":"#拆分聚合-使聚合并行化","children":[]}]}],"git":{"createdTime":1690914288000,"updatedTime":1690914288000,"contributors":[{"name":"jiangqingdong","email":"thejqd@gmail.com","commits":1}]},"readingTime":{"minutes":22.48,"words":6745},"filePathRelative":"30.分布式框架/02.ElasticSearch/20. ElasticSearch搜索技术深入与聚合查询实战.md","localizedDate":"2023年5月4日","excerpt":"<h2> 相关性和相关性算分</h2>\\n<p>搜索是用户和搜索引擎的对话，用户关心的是搜索结果的相关性</p>\\n<ul>\\n<li>是否可以找到所有相关的内容</li>\\n<li>有多少不相关的内容被返回了</li>\\n<li>文档的打分是否合理</li>\\n<li>结合业务需求，平衡结果排名</li>\\n</ul>\\n<p>如何衡量相关性：</p>\\n<ul>\\n<li>Precision(查准率)―尽可能返回较少的无关文档</li>\\n<li>Recall(查全率)–尽量返回较多的相关文档</li>\\n<li>Ranking -是否能够按照相关度进行排序</li>\\n</ul>\\n<h3> 相关性（Relevance）</h3>","autoDesc":true}');export{e as data};
