const e=JSON.parse('{"key":"v-46a57388","path":"/pages/27f67e/","title":"深入理解网络通信和TCP/IP协议","lang":"zh-CN","frontmatter":{"title":"深入理解网络通信和TCP/IP协议","date":"2023-03-22T22:34:41.000Z","permalink":"/pages/27f67e/","author":{"name":"江"},"category":["Netty"],"description":"网络协议 计算机网络是什么？ 随着计算机技术发展，计算机的体积和价格都在下降，之前计算机多用于研究机构，现阶段逐步进入一般的公司用于办公。原来计算机之间传输数据需要通过软盘等第三方存储介质进行转存，人们需要将数据直接通过通信线路传输，来缩短传输时间，于是计算机网络开始诞生，并逐渐发展为现在巨大的Internet。 定义和分类 计算机网络的标准定义是：利用通信线路将地理上分散的、具有独立功能的计算机系统和通信设备按不同的形式连接起来，以功能完善的网络软件及协议实现资源共享和信息传递的系统。 计算机网络从覆盖范围上划分可以分为三类：局域网、城域网、广域网。局域网LAN（作用范围一般为几米到几十公里）、城域网MAN（界于WAN与LAN之间）、广域网WAN（作用范围一般为几十到几千公里）。当然计算机网络划分不止这一种分类方式，可以按拓扑结构分类（总线型、环型、星型、网状）、还可以按按信息的交换方式（电路交换、报文交换、报文分组交换）来分等等方式。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/pages/27f67e/"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"深入理解网络通信和TCP/IP协议"}],["meta",{"property":"og:description","content":"网络协议 计算机网络是什么？ 随着计算机技术发展，计算机的体积和价格都在下降，之前计算机多用于研究机构，现阶段逐步进入一般的公司用于办公。原来计算机之间传输数据需要通过软盘等第三方存储介质进行转存，人们需要将数据直接通过通信线路传输，来缩短传输时间，于是计算机网络开始诞生，并逐渐发展为现在巨大的Internet。 定义和分类 计算机网络的标准定义是：利用通信线路将地理上分散的、具有独立功能的计算机系统和通信设备按不同的形式连接起来，以功能完善的网络软件及协议实现资源共享和信息传递的系统。 计算机网络从覆盖范围上划分可以分为三类：局域网、城域网、广域网。局域网LAN（作用范围一般为几米到几十公里）、城域网MAN（界于WAN与LAN之间）、广域网WAN（作用范围一般为几十到几千公里）。当然计算机网络划分不止这一种分类方式，可以按拓扑结构分类（总线型、环型、星型、网状）、还可以按按信息的交换方式（电路交换、报文交换、报文分组交换）来分等等方式。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-01T18:24:48.000Z"}],["meta",{"property":"article:author","content":"江"}],["meta",{"property":"article:published_time","content":"2023-03-22T22:34:41.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-01T18:24:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深入理解网络通信和TCP/IP协议\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-22T22:34:41.000Z\\",\\"dateModified\\":\\"2023-08-01T18:24:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"江\\"}]}"]]},"headers":[{"level":3,"title":"计算机网络是什么？","slug":"计算机网络是什么","link":"#计算机网络是什么","children":[]},{"level":3,"title":"计算机网络发展简史","slug":"计算机网络发展简史","link":"#计算机网络发展简史","children":[]},{"level":3,"title":"计算机网络体系结构","slug":"计算机网络体系结构","link":"#计算机网络体系结构","children":[]},{"level":2,"title":"实战观察TCP报文","slug":"实战观察tcp报文","link":"#实战观察tcp报文","children":[]}],"git":{"createdTime":1684927673000,"updatedTime":1690914288000,"contributors":[{"name":"jiangqingdong","email":"thejqd@gmail.com","commits":2}]},"readingTime":{"minutes":39.89,"words":11966},"filePathRelative":"Netty/00.深入理解网络通信和TCP IP协议.md","localizedDate":"2023年3月23日","excerpt":"<h1> 网络协议</h1>\\n<h3> 计算机网络是什么？</h3>\\n<p>随着计算机技术发展，计算机的体积和价格都在下降，之前计算机多用于研究机构，现阶段逐步进入一般的公司用于办公。原来计算机之间传输数据需要通过软盘等第三方存储介质进行转存，人们需要将数据直接通过通信线路传输，来缩短传输时间，于是计算机网络开始诞生，并逐渐发展为现在巨大的Internet。</p>\\n<h4> 定义和分类</h4>\\n<p>计算机网络的标准定义是：利用通信线路将地理上分散的、具有独立功能的计算机系统和通信设备按不同的形式连接起来，以功能完善的网络软件及协议实现资源共享和信息传递的系统。</p>\\n<p>计算机网络从覆盖范围上划分可以分为三类：局域网、城域网、广域网。局域网LAN（作用范围一般为几米到几十公里）、城域网MAN（界于WAN与LAN之间）、广域网WAN（作用范围一般为几十到几千公里）。当然计算机网络划分不止这一种分类方式，可以按拓扑结构分类（总线型、环型、星型、网状）、还可以按按信息的交换方式（电路交换、报文交换、报文分组交换）来分等等方式。</p>","autoDesc":true}');export{e as data};
