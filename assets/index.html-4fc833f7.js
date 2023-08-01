const e=JSON.parse('{"key":"v-c1444e92","path":"/pages/7fea8a/","title":"JDK1.7 HashMap在并发情况下的死循环问题","lang":"zh-CN","frontmatter":{"title":"JDK1.7 HashMap在并发情况下的死循环问题","date":"2022-11-03T08:39:23.000Z","permalink":"/pages/7fea8a/","author":{"name":"江"},"category":["并发编程"],"description":"问题 最近的几次面试中，我都问了是否了解 HashMap 在并发使用时可能发生死循环，导致 cpu100%，结果让我很意外，都表示不知道有这样的问题，让我意外的是面试者的工作年限都不短。 由于 HashMap 并非是线程安全的，所以在高并发的情况下必然会出现问题，这是一个普遍的问题，虽然网上分析的文章很多，还是觉得有必须写一篇文章，让关注我公众号的同学能够意识到这个问题，并了解这个死循环是如何产生的。 如果是在单线程下使用 HashMap，自然是没有问题的，如果后期由于代码优化，这段逻辑引入了多线程并发执行，在一个未知的时间点，会发现 CPU 占用 100%，居高不下，通过查看堆栈，你会惊讶的发现，线程都 Hang 在 hashMap 的 get() 方法上，服务重启之后，问题消失，过段时间可能又复现了。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/pages/7fea8a/"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"JDK1.7 HashMap在并发情况下的死循环问题"}],["meta",{"property":"og:description","content":"问题 最近的几次面试中，我都问了是否了解 HashMap 在并发使用时可能发生死循环，导致 cpu100%，结果让我很意外，都表示不知道有这样的问题，让我意外的是面试者的工作年限都不短。 由于 HashMap 并非是线程安全的，所以在高并发的情况下必然会出现问题，这是一个普遍的问题，虽然网上分析的文章很多，还是觉得有必须写一篇文章，让关注我公众号的同学能够意识到这个问题，并了解这个死循环是如何产生的。 如果是在单线程下使用 HashMap，自然是没有问题的，如果后期由于代码优化，这段逻辑引入了多线程并发执行，在一个未知的时间点，会发现 CPU 占用 100%，居高不下，通过查看堆栈，你会惊讶的发现，线程都 Hang 在 hashMap 的 get() 方法上，服务重启之后，问题消失，过段时间可能又复现了。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-01T18:24:48.000Z"}],["meta",{"property":"article:author","content":"江"}],["meta",{"property":"article:published_time","content":"2022-11-03T08:39:23.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-01T18:24:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JDK1.7 HashMap在并发情况下的死循环问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-03T08:39:23.000Z\\",\\"dateModified\\":\\"2023-08-01T18:24:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"江\\"}]}"]]},"headers":[{"level":3,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":3,"title":"原因分析","slug":"原因分析","link":"#原因分析","children":[]},{"level":3,"title":"实现","slug":"实现","link":"#实现","children":[]},{"level":3,"title":"案例分析","slug":"案例分析","link":"#案例分析","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1690914288000,"updatedTime":1690914288000,"contributors":[{"name":"jiangqingdong","email":"thejqd@gmail.com","commits":1}]},"readingTime":{"minutes":5.65,"words":1696},"filePathRelative":"10.并发编程/11.JDK 1.7 HashMap在并发情况下的死循环问题.md","localizedDate":"2022年11月3日","excerpt":"<h3> 问题</h3>\\n<p>最近的几次面试中，我都问了是否了解 HashMap 在并发使用时可能发生死循环，导致 cpu100%，结果让我很意外，都表示不知道有这样的问题，让我意外的是面试者的工作年限都不短。</p>\\n<p>由于 HashMap 并非是线程安全的，所以在高并发的情况下必然会出现问题，这是一个普遍的问题，虽然网上分析的文章很多，还是觉得有必须写一篇文章，让关注我公众号的同学能够意识到这个问题，并了解这个死循环是如何产生的。</p>\\n<p>如果是在单线程下使用 HashMap，自然是没有问题的，如果后期由于代码优化，这段逻辑引入了多线程并发执行，在一个未知的时间点，会发现 CPU 占用 100%，居高不下，通过查看堆栈，你会惊讶的发现，线程都 Hang 在 hashMap 的 get() 方法上，服务重启之后，问题消失，过段时间可能又复现了。</p>","autoDesc":true}');export{e as data};
