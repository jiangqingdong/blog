const e=JSON.parse('{"key":"v-16bf13fc","path":"/pages/65cbf7/","title":"并发编程之深入理解JMM&并发三大特性","lang":"zh-CN","frontmatter":{"title":"并发编程之深入理解JMM&并发三大特性","date":"2022-10-11T03:04:39.000Z","permalink":"/pages/65cbf7/","author":{"name":"江"},"category":["并发编程"],"description":"并发和并行 目标都是最大化CPU的使用率 并发 Concurrency：指在同一时刻只能有一条指令执行，但多个进程指令被快速的轮换执行，使得在宏观上具有多个进程同时执行的效果，但在微观上并不是同时执行的，只是把时间分成若干段，使多个进程快速交替的执行。 image-20230615181649169","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/pages/65cbf7/"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"并发编程之深入理解JMM&并发三大特性"}],["meta",{"property":"og:description","content":"并发和并行 目标都是最大化CPU的使用率 并发 Concurrency：指在同一时刻只能有一条指令执行，但多个进程指令被快速的轮换执行，使得在宏观上具有多个进程同时执行的效果，但在微观上并不是同时执行的，只是把时间分成若干段，使多个进程快速交替的执行。 image-20230615181649169"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-01T18:24:48.000Z"}],["meta",{"property":"article:author","content":"江"}],["meta",{"property":"article:published_time","content":"2022-10-11T03:04:39.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-01T18:24:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"并发编程之深入理解JMM&并发三大特性\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-10-11T03:04:39.000Z\\",\\"dateModified\\":\\"2023-08-01T18:24:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"江\\"}]}"]]},"headers":[{"level":2,"title":"并发和并行","slug":"并发和并行","link":"#并发和并行","children":[{"level":3,"title":"并发三大特性","slug":"并发三大特性","link":"#并发三大特性","children":[]},{"level":3,"title":"可见性问题深入分析","slug":"可见性问题深入分析","link":"#可见性问题深入分析","children":[]}]},{"level":2,"title":"Java内存模型（JMM）","slug":"java内存模型-jmm","link":"#java内存模型-jmm","children":[{"level":3,"title":"JMM定义","slug":"jmm定义","link":"#jmm定义","children":[]},{"level":3,"title":"内存间交互操作","slug":"内存间交互操作","link":"#内存间交互操作","children":[]},{"level":3,"title":"顺序一致性模型","slug":"顺序一致性模型","link":"#顺序一致性模型","children":[]},{"level":3,"title":"JMM的内存可见性保证","slug":"jmm的内存可见性保证","link":"#jmm的内存可见性保证","children":[]},{"level":3,"title":"volatile的内存语义","slug":"volatile的内存语义","link":"#volatile的内存语义","children":[]},{"level":3,"title":"有序性问题深入分析","slug":"有序性问题深入分析","link":"#有序性问题深入分析","children":[]}]}],"git":{"createdTime":1690914288000,"updatedTime":1690914288000,"contributors":[{"name":"jiangqingdong","email":"thejqd@gmail.com","commits":1}]},"readingTime":{"minutes":25.47,"words":7642},"filePathRelative":"10.并发编程/00.并发编程之深入理解JMM&并发三大特性.md","localizedDate":"2022年10月11日","excerpt":"<h2> 并发和并行</h2>\\n<p>目标都是最大化CPU的使用率</p>\\n<p><strong>并发 Concurrency</strong>：指在同一时刻只能有一条指令执行，但多个进程指令被快速的轮换执行，使得在宏观上具有多个进程同时执行的效果，但在微观上并不是同时执行的，只是把时间分成若干段，使多个进程快速交替的执行。</p>\\n<figure><img src=\\"https://img.jssjqd.cn/202306151816933.png\\" alt=\\"image-20230615181649169\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20230615181649169</figcaption></figure>","autoDesc":true}');export{e as data};