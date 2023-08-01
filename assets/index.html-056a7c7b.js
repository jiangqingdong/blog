const e=JSON.parse('{"key":"v-3a1631ef","path":"/pages/5hyd42/","title":"Spring之Bean生命周期源码解析","lang":"zh-CN","frontmatter":{"title":"Spring之Bean生命周期源码解析","date":"2023-06-19T15:27:30.000Z","permalink":"/pages/5hyd42/","author":{"name":"江"},"category":["Spring"],"description":"Spring最重要的功能就是帮助程序员创建对象（也就是IOC），而启动Spring就是为创建Bean对象做准备，所以我们先明白Spring到底是怎么去创建Bean的，也就是先弄明白Bean的生命周期。 Bean的生命周期就是指：在Spring中，一个Bean是如何生成的，如何销毁的 Bean生命周期流程图 image-20230619153300982","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/pages/5hyd42/"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"Spring之Bean生命周期源码解析"}],["meta",{"property":"og:description","content":"Spring最重要的功能就是帮助程序员创建对象（也就是IOC），而启动Spring就是为创建Bean对象做准备，所以我们先明白Spring到底是怎么去创建Bean的，也就是先弄明白Bean的生命周期。 Bean的生命周期就是指：在Spring中，一个Bean是如何生成的，如何销毁的 Bean生命周期流程图 image-20230619153300982"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-01T18:24:48.000Z"}],["meta",{"property":"article:author","content":"江"}],["meta",{"property":"article:published_time","content":"2023-06-19T15:27:30.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-01T18:24:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring之Bean生命周期源码解析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-19T15:27:30.000Z\\",\\"dateModified\\":\\"2023-08-01T18:24:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"江\\"}]}"]]},"headers":[{"level":2,"title":"Bean的生成过程","slug":"bean的生成过程","link":"#bean的生成过程","children":[{"level":3,"title":"1. 生成BeanDefinition","slug":"_1-生成beandefinition","link":"#_1-生成beandefinition","children":[]},{"level":3,"title":"2. 合并BeanDefinition","slug":"_2-合并beandefinition","link":"#_2-合并beandefinition","children":[]},{"level":3,"title":"3. 加载类","slug":"_3-加载类","link":"#_3-加载类","children":[]},{"level":3,"title":"4. 实例化前","slug":"_4-实例化前","link":"#_4-实例化前","children":[]},{"level":3,"title":"5. 实例化","slug":"_5-实例化","link":"#_5-实例化","children":[]},{"level":3,"title":"5.1 Supplier创建对象","slug":"_5-1-supplier创建对象","link":"#_5-1-supplier创建对象","children":[]},{"level":3,"title":"5.2 工厂方法创建对象","slug":"_5-2-工厂方法创建对象","link":"#_5-2-工厂方法创建对象","children":[]},{"level":3,"title":"5.3 推断构造方法","slug":"_5-3-推断构造方法","link":"#_5-3-推断构造方法","children":[]},{"level":3,"title":"6. BeanDefinition的后置处理","slug":"_6-beandefinition的后置处理","link":"#_6-beandefinition的后置处理","children":[]},{"level":3,"title":"7. 实例化后","slug":"_7-实例化后","link":"#_7-实例化后","children":[]},{"level":3,"title":"8. 自动注入","slug":"_8-自动注入","link":"#_8-自动注入","children":[]},{"level":3,"title":"9. 处理属性","slug":"_9-处理属性","link":"#_9-处理属性","children":[]},{"level":3,"title":"10. 执行Aware","slug":"_10-执行aware","link":"#_10-执行aware","children":[]},{"level":3,"title":"11. 初始化前","slug":"_11-初始化前","link":"#_11-初始化前","children":[]},{"level":3,"title":"12. 初始化","slug":"_12-初始化","link":"#_12-初始化","children":[]},{"level":3,"title":"13. 初始化后","slug":"_13-初始化后","link":"#_13-初始化后","children":[]},{"level":3,"title":"总结BeanPostProcessor","slug":"总结beanpostprocessor","link":"#总结beanpostprocessor","children":[]}]},{"level":2,"title":"Bean的销毁过程","slug":"bean的销毁过程","link":"#bean的销毁过程","children":[]}],"git":{"createdTime":1690914288000,"updatedTime":1690914288000,"contributors":[{"name":"jiangqingdong","email":"thejqd@gmail.com","commits":1}]},"readingTime":{"minutes":11.05,"words":3315},"filePathRelative":"00.Spring/05. Spring之Bean生命周期源码解析.md","localizedDate":"2023年6月19日","excerpt":"<p>Spring最重要的功能就是帮助程序员创建对象（也就是IOC），而启动Spring就是为创建Bean对象做准备，所以我们先明白Spring到底是怎么去创建Bean的，也就是先弄明白Bean的生命周期。</p>\\n<p>Bean的生命周期就是指：<strong>在Spring中，一个Bean是如何生成的，如何销毁的</strong></p>\\n<p>Bean生命周期流程图</p>\\n<figure><img src=\\"https://img.jssjqd.cn/202306191533316.png\\" alt=\\"image-20230619153300982\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20230619153300982</figcaption></figure>","autoDesc":true}');export{e as data};
