const e=JSON.parse('{"key":"v-1aaa73a6","path":"/pages/ed68ae/","title":"负载均衡Ribbon&LoadBalancer实战","lang":"zh-CN","frontmatter":{"title":"负载均衡Ribbon&LoadBalancer实战","date":"2023-04-08T17:20:53.000Z","permalink":"/pages/ed68ae/","author":{"name":"江"},"category":["微服务","Spring Cloud Alibaba"],"description":"负载均衡介绍 负载均衡（Load Balance），其含义就是指将负载（工作任务）进行平衡、分摊到多个操作单元上进行运行，例如FTP服务器、Web服务器、企业核心应用服务器和其它主要任务服务器等，从而协同完成工作任务。 思考： 如果有多个provider实例，consumer应该如何调用呢？ 目前主流的负载均衡方案分为以下两种： 集中式负载均衡，在消费者和服务提供方中间使用独立的代理方式进行负载，有硬件的（比如 F5），也有软件的（比如 Nginx）。 客户端根据自己的请求情况做负载均衡，Ribbon 就属于客户端自己做负载均衡。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/pages/ed68ae/"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"负载均衡Ribbon&LoadBalancer实战"}],["meta",{"property":"og:description","content":"负载均衡介绍 负载均衡（Load Balance），其含义就是指将负载（工作任务）进行平衡、分摊到多个操作单元上进行运行，例如FTP服务器、Web服务器、企业核心应用服务器和其它主要任务服务器等，从而协同完成工作任务。 思考： 如果有多个provider实例，consumer应该如何调用呢？ 目前主流的负载均衡方案分为以下两种： 集中式负载均衡，在消费者和服务提供方中间使用独立的代理方式进行负载，有硬件的（比如 F5），也有软件的（比如 Nginx）。 客户端根据自己的请求情况做负载均衡，Ribbon 就属于客户端自己做负载均衡。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-24T11:27:53.000Z"}],["meta",{"property":"article:author","content":"江"}],["meta",{"property":"article:published_time","content":"2023-04-08T17:20:53.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-24T11:27:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"负载均衡Ribbon&LoadBalancer实战\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-08T17:20:53.000Z\\",\\"dateModified\\":\\"2023-05-24T11:27:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"江\\"}]}"]]},"headers":[{"level":2,"title":"负载均衡介绍","slug":"负载均衡介绍","link":"#负载均衡介绍","children":[{"level":3,"title":"客户端的负载均衡","slug":"客户端的负载均衡","link":"#客户端的负载均衡","children":[]},{"level":3,"title":"服务端的负载均衡","slug":"服务端的负载均衡","link":"#服务端的负载均衡","children":[]},{"level":3,"title":"常见负载均衡算法","slug":"常见负载均衡算法","link":"#常见负载均衡算法","children":[]}]},{"level":2,"title":"什么是Ribbon","slug":"什么是ribbon","link":"#什么是ribbon","children":[{"level":3,"title":"Spring Cloud Alibaba整合Ribbon快速开始","slug":"spring-cloud-alibaba整合ribbon快速开始","link":"#spring-cloud-alibaba整合ribbon快速开始","children":[]},{"level":3,"title":"Ribbon内核原理","slug":"ribbon内核原理","link":"#ribbon内核原理","children":[]},{"level":3,"title":"Ribbon扩展功能","slug":"ribbon扩展功能","link":"#ribbon扩展功能","children":[]}]},{"level":2,"title":"什么是LoadBalancer","slug":"什么是loadbalancer","link":"#什么是loadbalancer","children":[{"level":3,"title":"RestTemplate整合LoadBalancer","slug":"resttemplate整合loadbalancer","link":"#resttemplate整合loadbalancer","children":[]},{"level":3,"title":"WebClient整合LoadBalancer","slug":"webclient整合loadbalancer","link":"#webclient整合loadbalancer","children":[]}]}],"git":{"createdTime":1684927673000,"updatedTime":1684927673000,"contributors":[{"name":"jiangqingdong","email":"thejqd@gmail.com","commits":1}]},"readingTime":{"minutes":9.19,"words":2758},"filePathRelative":"微服务/10.Spring Cloud Alibaba/10.负载均衡Ribbon&LoadBalancer实战.md","localizedDate":"2023年4月9日","excerpt":"<h2> 负载均衡介绍</h2>\\n<p>负载均衡（Load Balance），其含义就是指将负载（工作任务）进行平衡、分摊到多个操作单元上进行运行，例如FTP服务器、Web服务器、企业核心应用服务器和其它主要任务服务器等，从而协同完成工作任务。</p>\\n<p>思考： 如果有多个provider实例，consumer应该如何调用呢？</p>\\n<p>目前主流的负载均衡方案分为以下两种：</p>\\n<ul>\\n<li>集中式负载均衡，在消费者和服务提供方中间使用独立的代理方式进行负载，有硬件的（比如 F5），也有软件的（比如 Nginx）。</li>\\n<li>客户端根据自己的请求情况做负载均衡，Ribbon 就属于客户端自己做负载均衡。</li>\\n</ul>","autoDesc":true}');export{e as data};
