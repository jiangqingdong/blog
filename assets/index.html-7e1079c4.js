import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as s,c as l,a as e,b as t,e as n,f as a}from"./app-18640bff.js";const h={},p=e("hr",null,null,-1),d=e("h1",{id:"三-计算机基础",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#三-计算机基础","aria-hidden":"true"},"#"),t(" 三 计算机基础")],-1),c=e("h2",{id:"_3-1-计算机网络",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-1-计算机网络","aria-hidden":"true"},"#"),t(" 3.1 计算机网络")],-1),g=e("p",null,"作者：Guide哥。",-1),T=e("strong",null,"介绍:",-1),P={href:"https://github.com/Snailclimb/JavaGuide",target:"_blank",rel:"noopener noreferrer"},u=a('<h3 id="_3-1-1-osi与tcp-ip各层的结构与功能-都有哪些协议" tabindex="-1"><a class="header-anchor" href="#_3-1-1-osi与tcp-ip各层的结构与功能-都有哪些协议" aria-hidden="true">#</a> 3.1.1 OSI与TCP/IP各层的结构与功能,都有哪些协议?</h3><p>学习计算机网络时我们一般采用折中的办法，也就是中和 OSI 和 TCP/IP 的优点，采用一种只有五层协议的体系结构，这样既简洁又能将概念阐述清楚。</p><figure><img src="http://img.jssjqd.cn/20200709191056.png" alt="五层结构体系" tabindex="0" loading="lazy"><figcaption>五层结构体系</figcaption></figure><p>结合互联网的情况，自上而下地，非常简要的介绍一下各层的作用。</p><h4 id="应用层" tabindex="-1"><a class="header-anchor" href="#应用层" aria-hidden="true">#</a> 应用层</h4><p><strong>应用层(application-layer）的任务是通过应用进程间的交互来完成特定网络应用。<strong>应用层协议定义的是应用进程（进程：主机中正在运行的程序）间的通信和交互的规则。对于不同的网络应用需要不同的应用层协议。在互联网中应用层协议很多，如</strong>域名系统DNS</strong>，支持万维网应用的 <strong>HTTP协议</strong>，支持电子邮件的 <strong>SMTP协议</strong>等等。我们把应用层交互的数据单元称为报文。</p><p><strong>域名系统</strong></p>',7),_={href:"http://www.ibm.com",target:"_blank",rel:"noopener noreferrer"},f={href:"http://www.oracle.com",target:"_blank",rel:"noopener noreferrer"},b={href:"http://www.cisco.com",target:"_blank",rel:"noopener noreferrer"},C=a('<p><strong>HTTP协议</strong></p><blockquote><p>超文本传输协议（HTTP，HyperText Transfer Protocol)是互联网上应用最为广泛的一种网络协议。所有的 WWW（万维网） 文件都必须遵守这个标准。设计 HTTP 最初的目的是为了提供一种发布和接收 HTML 页面的方法。（百度百科）</p></blockquote><h4 id="运输层" tabindex="-1"><a class="header-anchor" href="#运输层" aria-hidden="true">#</a> 运输层</h4><p><strong>运输层(transport layer)的主要任务就是负责向两台主机进程之间的通信提供通用的数据传输服务</strong>。应用进程利用该服务传送应用层报文。“通用的”是指并不针对某一个特定的网络应用，而是多种应用可以使用同一个运输层服务。由于一台主机可同时运行多个线程，因此运输层有复用和分用的功能。所谓复用就是指多个应用层进程可同时使用下面运输层的服务，分用和复用相反，是运输层把收到的信息分别交付上面应用层中的相应进程。</p><p><strong>运输层主要使用以下两种协议:</strong></p><ol><li><strong>传输控制协议 TCP</strong>（Transmission Control Protocol）--提供<strong>面向连接</strong>的，<strong>可靠的</strong>数据传输服务。</li><li><strong>用户数据协议 UDP</strong>（User Datagram Protocol）--提供<strong>无连接</strong>的，尽最大努力的数据传输服务（<strong>不保证数据传输的可靠性</strong>）。</li></ol><p><strong>TCP 与 UDP 的对比见问题三。</strong></p><h4 id="网络层" tabindex="-1"><a class="header-anchor" href="#网络层" aria-hidden="true">#</a> 网络层</h4><p><strong>在 计算机网络中进行通信的两个计算机之间可能会经过很多个数据链路，也可能还要经过很多通信子网。网络层的任务就是选择合适的网间路由和交换结点， 确保数据及时传送。</strong> 在发送数据时，网络层把运输层产生的报文段或用户数据报封装成分组和包进行传送。在 TCP/IP 体系结构中，由于网络层使用 <strong>IP 协议</strong>，因此分组也叫 <strong>IP 数据报</strong> ，简称 <strong>数据报</strong>。</p><p>这里要注意：<strong>不要把运输层的“用户数据报 UDP ”和网络层的“ IP 数据报”弄混</strong>。另外，无论是哪一层的数据单元，都可笼统地用“分组”来表示。</p><p>这里强调指出，网络层中的“网络”二字已经不是我们通常谈到的具体网络，而是指计算机网络体系结构模型中第三层的名称.</p><p>互联网是由大量的异构（heterogeneous）网络通过路由器（router）相互连接起来的。互联网使用的网络层协议是无连接的网际协议（Intert Protocol）和许多路由选择协议，因此互联网的网络层也叫做<strong>网际层</strong>或<strong>IP层</strong>。</p><h4 id="数据链路层" tabindex="-1"><a class="header-anchor" href="#数据链路层" aria-hidden="true">#</a> 数据链路层</h4><p><strong>数据链路层(data link layer)通常简称为链路层。两台主机之间的数据传输，总是在一段一段的链路上传送的，这就需要使用专门的链路层的协议。</strong> 在两个相邻节点之间传送数据时，<strong>数据链路层将网络层交下来的 IP 数据报组装成帧</strong>，在两个相邻节点间的链路上传送帧。每一帧包括数据和必要的控制信息（如同步信息，地址信息，差错控制等）。</p><p>在接收数据时，控制信息使接收端能够知道一个帧从哪个比特开始和到哪个比特结束。这样，数据链路层在收到一个帧后，就可从中提出数据部分，上交给网络层。 控制信息还使接收端能够检测到所收到的帧中有误差错。如果发现差错，数据链路层就简单地丢弃这个出了差错的帧，以避免继续在网络中传送下去白白浪费网络资源。如果需要改正数据在链路层传输时出现差错（这就是说，数据链路层不仅要检错，而且还要纠错），那么就要采用可靠性传输协议来纠正出现的差错。这种方法会使链路层的协议复杂些。</p><h4 id="物理层" tabindex="-1"><a class="header-anchor" href="#物理层" aria-hidden="true">#</a> 物理层</h4><p>在物理层上所传送的数据单位是比特。 <strong>物理层(physical layer)的作用是实现相邻计算机节点之间比特流的透明传送，尽可能屏蔽掉具体传输介质和物理设备的差异。</strong> 使其上面的数据链路层不必考虑网络的具体传输介质是什么。“透明传送比特流”表示经实际电路传送后的比特流没有发生变化，对传送的比特流来说，这个电路好像是看不见的。</p><p>在互联网使用的各种协中最重要和最著名的就是 TCP/IP 两个协议。现在人们经常提到的TCP/IP并不一定单指TCP和IP这两个具体的协议，而往往表示互联网所使用的整个TCP/IP协议族。</p><h4 id="总结一下" tabindex="-1"><a class="header-anchor" href="#总结一下" aria-hidden="true">#</a> 总结一下</h4>',19),m={href:"https://blog.csdn.net/yaopeng_2005/article/details/7064869",target:"_blank",rel:"noopener noreferrer"},H=a('<p><img src="http://img.jssjqd.cn/20200709191359.png" alt="七层体系结构图" loading="lazy">)</p><h3 id="_3-1-2-tcp-三次握手和四次挥手-面试常客" tabindex="-1"><a class="header-anchor" href="#_3-1-2-tcp-三次握手和四次挥手-面试常客" aria-hidden="true">#</a> 3.1.2 TCP 三次握手和四次挥手(面试常客)</h3><p>为了准确无误地把数据送达目标处，TCP协议采用了三次握手策略。</p><h4 id="tcp-三次握手漫画图解" tabindex="-1"><a class="header-anchor" href="#tcp-三次握手漫画图解" aria-hidden="true">#</a> TCP 三次握手漫画图解</h4><p>如下图所示，下面的两个机器人通过3次握手确定了对方能正确接收和发送消息(图片来源：《图解HTTP》)。 <img src="http://img.jssjqd.cn/20200709191615.png" alt="TCP三次握手" loading="lazy">)</p><p><strong>简单示意图：</strong><img src="http://img.jssjqd.cn/20200709191637.png" alt="TCP三次握手" loading="lazy">)</p><ul><li>客户端–发送带有 SYN 标志的数据包–一次握手–服务端</li><li>服务端–发送带有 SYN/ACK 标志的数据包–二次握手–客户端</li><li>客户端–发送带有带有 ACK 标志的数据包–三次握手–服务端</li></ul><h4 id="为什么要三次握手" tabindex="-1"><a class="header-anchor" href="#为什么要三次握手" aria-hidden="true">#</a> 为什么要三次握手</h4><p><strong>三次握手的目的是建立可靠的通信信道，说到通讯，简单来说就是数据的发送与接收，而三次握手最主要的目的就是双方确认自己与对方的发送与接收是正常的。</strong></p><p>第一次握手：Client 什么都不能确认；Server 确认了对方发送正常，自己接收正常</p><p>第二次握手：Client 确认了：自己发送、接收正常，对方发送、接收正常；Server 确认了：对方发送正常，自己接收正常</p><p>第三次握手：Client 确认了：自己发送、接收正常，对方发送、接收正常；Server 确认了：自己发送、接收正常，对方发送、接收正常</p><p>所以三次握手就能确认双发收发功能都正常，缺一不可。</p><h4 id="为什么要传回-syn" tabindex="-1"><a class="header-anchor" href="#为什么要传回-syn" aria-hidden="true">#</a> 为什么要传回 SYN</h4><p>接收端传回发送端所发送的 SYN 是为了告诉发送端，我接收到的信息确实就是你所发送的信号了。</p><blockquote><p>SYN 是 TCP/IP 建立连接时使用的握手信号。在客户机和服务器之间建立正常的 TCP 网络连接时，客户机首先发出一个 SYN 消息，服务器使用 SYN-ACK 应答表示接收到了这个消息，最后客户机再以 ACK(Acknowledgement[汉译：确认字符 ,在数据通信传输中，接收站发给发送站的一种传输控制字符。它表示确认发来的数据已经接受无误。 ]）消息响应。这样在客户机和服务器之间才能建立起可靠的TCP连接，数据才可以在客户机和服务器之间传递。</p></blockquote><h4 id="传了-syn-为啥还要传-ack" tabindex="-1"><a class="header-anchor" href="#传了-syn-为啥还要传-ack" aria-hidden="true">#</a> 传了 SYN,为啥还要传 ACK</h4><p>双方通信无误必须是两者互相发送信息都无误。传了 SYN，证明发送方到接收方的通道没有问题，但是接收方到发送方的通道还需要 ACK 信号来进行验证。</p><p><img src="http://img.jssjqd.cn/20200709191724.png" alt="TCP四次挥手" loading="lazy">)</p><p>断开一个 TCP 连接则需要“四次挥手”：</p><ul><li>客户端-发送一个 FIN，用来关闭客户端到服务器的数据传送</li><li>服务器-收到这个 FIN，它发回一 个 ACK，确认序号为收到的序号加1 。和 SYN 一样，一个 FIN 将占用一个序号</li><li>服务器-关闭与客户端的连接，发送一个FIN给客户端</li><li>客户端-发回 ACK 报文确认，并将确认序号设置为收到序号加1</li></ul><h4 id="为什么要四次挥手" tabindex="-1"><a class="header-anchor" href="#为什么要四次挥手" aria-hidden="true">#</a> 为什么要四次挥手</h4><p>任何一方都可以在数据传送结束后发出连接释放的通知，待对方确认后进入半关闭状态。当另一方也没有数据再发送的时候，则发出连接释放通知，对方确认后就完全关闭了TCP连接。</p><p>举个例子：A 和 B 打电话，通话即将结束后，A 说“我没啥要说的了”，B回答“我知道了”，但是 B 可能还会有要说的话，A 不能要求 B 跟着自己的节奏结束通话，于是 B 可能又巴拉巴拉说了一通，最后 B 说“我说完了”，A 回答“知道了”，这样通话才算结束。</p>',24),S={href:"https://blog.csdn.net/qzcsu/article/details/72861891",target:"_blank",rel:"noopener noreferrer"},x=a('<h3 id="_3-1-2-tcp-udp-协议的区别" tabindex="-1"><a class="header-anchor" href="#_3-1-2-tcp-udp-协议的区别" aria-hidden="true">#</a> 3.1.2 TCP,UDP 协议的区别</h3><p><img src="http://img.jssjqd.cn/20200709191746.png" alt="TCP、UDP协议的区别" loading="lazy">)</p><p>UDP 在传送数据之前不需要先建立连接，远地主机在收到 UDP 报文后，不需要给出任何确认。虽然 UDP 不提供可靠交付，但在某些情况下 UDP 确是一种最有效的工作方式（一般用于即时通信），比如： QQ 语音、 QQ 视频 、直播等等</p><p>TCP 提供面向连接的服务。在传送数据之前必须先建立连接，数据传送结束后要释放连接。 TCP 不提供广播或多播服务。由于 TCP 要提供可靠的，面向连接的传输服务（TCP的可靠体现在TCP在传递数据之前，会有三次握手来建立连接，而且在数据传递时，有确认、窗口、重传、拥塞控制机制，在数据传完后，还会断开连接用来节约系统资源），这一难以避免增加了许多开销，如确认，流量控制，计时器以及连接管理等。这不仅使协议数据单元的首部增大很多，还要占用许多处理机资源。TCP 一般用于文件传输、发送和接收邮件、远程登录等场景。</p><h3 id="_3-1-3-tcp-协议如何保证可靠传输" tabindex="-1"><a class="header-anchor" href="#_3-1-3-tcp-协议如何保证可靠传输" aria-hidden="true">#</a> 3.1.3 TCP 协议如何保证可靠传输</h3><ol><li>应用数据被分割成 TCP 认为最适合发送的数据块。</li><li>TCP 给发送的每一个包进行编号，接收方对数据包进行排序，把有序数据传送给应用层。</li><li><strong>校验和：</strong> TCP 将保持它首部和数据的检验和。这是一个端到端的检验和，目的是检测数据在传输过程中的任何变化。如果收到段的检验和有差错，TCP 将丢弃这个报文段和不确认收到此报文段。</li><li>TCP 的接收端会丢弃重复的数据。</li><li><strong>流量控制：</strong> TCP 连接的每一方都有固定大小的缓冲空间，TCP的接收端只允许发送端发送接收端缓冲区能接纳的数据。当接收方来不及处理发送方的数据，能提示发送方降低发送的速率，防止包丢失。TCP 使用的流量控制协议是可变大小的滑动窗口协议。 （TCP 利用滑动窗口实现流量控制）</li><li><strong>拥塞控制：</strong> 当网络拥塞时，减少数据的发送。</li><li><strong>ARQ协议：</strong> 也是为了实现可靠传输的，它的基本原理就是每发完一个分组就停止发送，等待对方确认。在收到确认后再发下一个分组。</li><li><strong>超时重传：</strong> 当 TCP 发出一个段后，它启动一个定时器，等待目的端确认收到这个报文段。如果不能及时收到一个确认，将重发这个报文段。</li></ol><h3 id="_3-1-4-arq协议" tabindex="-1"><a class="header-anchor" href="#_3-1-4-arq协议" aria-hidden="true">#</a> 3.1.4 ARQ协议</h3><p><strong>自动重传请求</strong>（Automatic Repeat-reQuest，ARQ）是OSI模型中数据链路层和传输层的错误纠正协议之一。它通过使用确认和超时这两个机制，在不可靠服务的基础上实现可靠的信息传输。如果发送方在发送后一段时间之内没有收到确认帧，它通常会重新发送。ARQ包括停止等待ARQ协议和连续ARQ协议。</p><h4 id="停止等待arq协议" tabindex="-1"><a class="header-anchor" href="#停止等待arq协议" aria-hidden="true">#</a> 停止等待ARQ协议</h4><ul><li>停止等待协议是为了实现可靠传输的，它的基本原理就是每发完一个分组就停止发送，等待对方确认（回复ACK）。如果过了一段时间（超时时间后），还是没有收到 ACK 确认，说明没有发送成功，需要重新发送，直到收到确认后再发下一个分组；</li><li>在停止等待协议中，若接收方收到重复分组，就丢弃该分组，但同时还要发送确认；</li></ul><p><strong>优点：</strong> 简单</p><p><strong>缺点：</strong> 信道利用率低，等待时间长</p><p><strong>1) 无差错情况:</strong></p><p>发送方发送分组,接收方在规定时间内收到,并且回复确认.发送方再次发送。</p><p><strong>2) 出现差错情况（超时重传）:</strong></p><p>停止等待协议中超时重传是指只要超过一段时间仍然没有收到确认，就重传前面发送过的分组（认为刚才发送过的分组丢失了）。因此每发送完一个分组需要设置一个超时计时器，其重传时间应比数据在分组传输的平均往返时间更长一些。这种自动重传方式常称为 <strong>自动重传请求 ARQ</strong> 。另外在停止等待协议中若收到重复分组，就丢弃该分组，但同时还要发送确认。<strong>连续 ARQ 协议</strong> 可提高信道利用率。发送维持一个发送窗口，凡位于发送窗口内的分组可连续发送出去，而不需要等待对方确认。接收方一般采用累积确认，对按序到达的最后一个分组发送确认，表明到这个分组位置的所有分组都已经正确收到了。</p><p><strong>3) 确认丢失和确认迟到</strong></p><ul><li><strong>确认丢失</strong> ：确认消息在传输过程丢失。当A发送M1消息，B收到后，B向A发送了一个M1确认消息，但却在传输过程中丢失。而A并不知道，在超时计时过后，A重传M1消息，B再次收到该消息后采取以下两点措施：1. 丢弃这个重复的M1消息，不向上层交付。 2. 向A发送确认消息。（不会认为已经发送过了，就不再发送。A能重传，就证明B的确认消息丢失）。</li><li><strong>确认迟到</strong> ：确认消息在传输过程中迟到。A发送M1消息，B收到并发送确认。在超时时间内没有收到确认消息，A重传M1消息，B仍然收到并继续发送确认消息（B收到了2份M1）。此时A收到了B第二次发送的确认消息。接着发送其他数据。过了一会，A收到了B第一次发送的对M1的确认消息（A也收到了2份确认消息）。处理如下：1. A收到重复的确认后，直接丢弃。2. B收到重复的M1后，也直接丢弃重复的M1。</li></ul><h4 id="连续arq协议" tabindex="-1"><a class="header-anchor" href="#连续arq协议" aria-hidden="true">#</a> 连续ARQ协议</h4><p>连续 ARQ 协议可提高信道利用率。发送方维持一个发送窗口，凡位于发送窗口内的分组可以连续发送出去，而不需要等待对方确认。接收方一般采用累计确认，对按序到达的最后一个分组发送确认，表明到这个分组为止的所有分组都已经正确收到了。</p><p><strong>优点：</strong> 信道利用率高，容易实现，即使确认丢失，也不必重传。</p><p><strong>缺点：</strong> 不能向发送方反映出接收方已经正确收到的所有分组的信息。 比如：发送方发送了 5条 消息，中间第三条丢失（3号），这时接收方只能对前两个发送确认。发送方无法知道后三个分组的下落，而只好把后三个全部重传一次。这也叫 Go-Back-N（回退 N），表示需要退回来重传已经发送过的 N 个消息。</p><h3 id="_3-1-5-滑动窗口和流量控制" tabindex="-1"><a class="header-anchor" href="#_3-1-5-滑动窗口和流量控制" aria-hidden="true">#</a> 3.1.5 滑动窗口和流量控制</h3><p><strong>TCP 利用滑动窗口实现流量控制。流量控制是为了控制发送方发送速率，保证接收方来得及接收。</strong> 接收方发送的确认报文中的窗口字段可以用来控制发送方窗口大小，从而影响发送方的发送速率。将窗口字段设置为 0，则发送方不能发送数据。</p><h3 id="_3-1-6-拥塞控制" tabindex="-1"><a class="header-anchor" href="#_3-1-6-拥塞控制" aria-hidden="true">#</a> 3.1.6 拥塞控制</h3><p>在某段时间，若对网络中某一资源的需求超过了该资源所能提供的可用部分，网络的性能就要变坏。这种情况就叫拥塞。拥塞控制就是为了防止过多的数据注入到网络中，这样就可以使网络中的路由器或链路不致过载。拥塞控制所要做的都有一个前提，就是网络能够承受现有的网络负荷。拥塞控制是一个全局性的过程，涉及到所有的主机，所有的路由器，以及与降低网络传输性能有关的所有因素。相反，流量控制往往是点对点通信量的控制，是个端到端的问题。流量控制所要做到的就是抑制发送端发送数据的速率，以便使接收端来得及接收。</p><p>为了进行拥塞控制，TCP 发送方要维持一个 <strong>拥塞窗口(cwnd)</strong> 的状态变量。拥塞控制窗口的大小取决于网络的拥塞程度，并且动态变化。发送方让自己的发送窗口取为拥塞窗口和接收方的接受窗口中较小的一个。</p><p>TCP的拥塞控制采用了四种算法，即 <strong>慢开始</strong> 、 <strong>拥塞避免</strong> 、<strong>快重传</strong> 和 <strong>快恢复</strong>。在网络层也可以使路由器采用适当的分组丢弃策略（如主动队列管理 AQM），以减少网络拥塞的发生。</p><ul><li><strong>慢开始：</strong> 慢开始算法的思路是当主机开始发送数据时，如果立即把大量数据字节注入到网络，那么可能会引起网络阻塞，因为现在还不知道网络的符合情况。经验表明，较好的方法是先探测一下，即由小到大逐渐增大发送窗口，也就是由小到大逐渐增大拥塞窗口数值。cwnd初始值为1，每经过一个传播轮次，cwnd加倍。</li><li><strong>拥塞避免：</strong> 拥塞避免算法的思路是让拥塞窗口cwnd缓慢增大，即每经过一个往返时间RTT就把发送放的cwnd加1.</li><li><strong>快重传与快恢复：</strong> 在 TCP/IP 中，快速重传和恢复（fast retransmit and recovery，FRR）是一种拥塞控制算法，它能快速恢复丢失的数据包。没有 FRR，如果数据包丢失了，TCP 将会使用定时器来要求传输暂停。在暂停的这段时间内，没有新的或复制的数据包被发送。有了 FRR，如果接收机接收到一个不按顺序的数据段，它会立即给发送机发送一个重复确认。如果发送机接收到三个重复确认，它会假定确认件指出的数据段丢失了，并立即重传这些丢失的数据段。有了 FRR，就不会因为重传时要求的暂停被耽误。 　当有单独的数据包丢失时，快速重传和恢复（FRR）能最有效地工作。当有多个数据信息包在某一段很短的时间内丢失时，它则不能很有效地工作。</li></ul><h3 id="_3-1-7-在浏览器中输入url地址-显示主页的过程-面试常客" tabindex="-1"><a class="header-anchor" href="#_3-1-7-在浏览器中输入url地址-显示主页的过程-面试常客" aria-hidden="true">#</a> 3.1.7 在浏览器中输入url地址 -&gt;&gt; 显示主页的过程(面试常客)</h3><p>百度好像最喜欢问这个问题。</p><blockquote><p>打开一个网页，整个过程会使用哪些协议</p></blockquote><p>图解（图片来源：《图解HTTP》）：</p><img src="http://img.jssjqd.cn/20200709191816.png" style="zoom:50%;"><p>总体来说分为以下几个过程:</p><ol><li>DNS解析</li><li>TCP连接</li><li>发送HTTP请求</li><li>服务器处理请求并返回HTTP报文</li><li>浏览器解析渲染页面</li><li>连接结束</li></ol><p>具体可以参考下面这篇文章：</p>',37),k={href:"https://segmentfault.com/a/1190000006879700",target:"_blank",rel:"noopener noreferrer"},A=a(`<h3 id="_3-1-8-状态码" tabindex="-1"><a class="header-anchor" href="#_3-1-8-状态码" aria-hidden="true">#</a> 3.1.8 状态码</h3><figure><img src="http://img.jssjqd.cn/20200709191843.png" alt="状态码" tabindex="0" loading="lazy"><figcaption>状态码</figcaption></figure><h3 id="_3-1-9-各种协议与http协议之间的关系" tabindex="-1"><a class="header-anchor" href="#_3-1-9-各种协议与http协议之间的关系" aria-hidden="true">#</a> 3.1.9 各种协议与HTTP协议之间的关系</h3><p>一般面试官会通过这样的问题来考察你对计算机网络知识体系的理解。</p><p>图片来源：《图解HTTP》</p><figure><img src="http://img.jssjqd.cn/20200709191920.png" alt="各种协议与HTTP协议之间的关系" tabindex="0" loading="lazy"><figcaption>各种协议与HTTP协议之间的关系</figcaption></figure><h3 id="_3-1-10-http长连接-短连接" tabindex="-1"><a class="header-anchor" href="#_3-1-10-http长连接-短连接" aria-hidden="true">#</a> 3.1.10 HTTP长连接,短连接</h3><p>在HTTP/1.0中默认使用短连接。也就是说，客户端和服务器每进行一次HTTP操作，就建立一次连接，任务结束就中断连接。当客户端浏览器访问的某个HTML或其他类型的Web页中包含有其他的Web资源（如JavaScript文件、图像文件、CSS文件等），每遇到这样一个Web资源，浏览器就会重新建立一个HTTP会话。</p><p>而从HTTP/1.1起，默认使用长连接，用以保持连接特性。使用长连接的HTTP协议，会在响应头加入这行代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Connection:keep-alive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在使用长连接的情况下，当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，客户端再次访问这个服务器时，会继续使用这一条已经建立的连接。Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如Apache）中设定这个时间。实现长连接需要客户端和服务端都支持长连接。</p><p><strong>HTTP协议的长连接和短连接，实质上是TCP协议的长连接和短连接。</strong></p>`,12),I={href:"https://www.cnblogs.com/gotodsp/p/6366163.html",target:"_blank",rel:"noopener noreferrer"},R=a('<h3 id="_3-1-11-http是不保存状态的协议-如何保存用户状态" tabindex="-1"><a class="header-anchor" href="#_3-1-11-http是不保存状态的协议-如何保存用户状态" aria-hidden="true">#</a> 3.1.11 HTTP是不保存状态的协议,如何保存用户状态?</h3><p>HTTP 是一种不保存状态，即无状态（stateless）协议。也就是说 HTTP 协议自身不对请求和响应之间的通信状态进行保存。那么我们保存用户状态呢？Session 机制的存在就是为了解决这个问题，Session 的主要作用就是通过服务端记录用户的状态。典型的场景是购物车，当你要添加商品到购物车的时候，系统不知道是哪个用户操作的，因为 HTTP 协议是无状态的。服务端给特定的用户创建特定的 Session 之后就可以标识这个用户并且跟踪这个用户了（一般情况下，服务器会在一定时间内保存这个 Session，过了时间限制，就会销毁这个Session）。</p><p>在服务端保存 Session 的方法很多，最常用的就是内存和数据库(比如是使用内存数据库redis保存)。既然 Session 存放在服务器端，那么我们如何实现 Session 跟踪呢？大部分情况下，我们都是通过在 Cookie 中附加一个 Session ID 来方式来跟踪。</p><p><strong>Cookie 被禁用怎么办?</strong></p><p>最常用的就是利用 URL 重写把 Session ID 直接附加在URL路径的后面。</p><figure><img src="http://img.jssjqd.cn/20200709191939.png" alt="HTTP是无状态协议" tabindex="0" loading="lazy"><figcaption>HTTP是无状态协议</figcaption></figure><h3 id="_3-1-12-cookie的作用是什么-和session有什么区别" tabindex="-1"><a class="header-anchor" href="#_3-1-12-cookie的作用是什么-和session有什么区别" aria-hidden="true">#</a> 3.1.12 Cookie的作用是什么?和Session有什么区别？</h3><p>Cookie 和 Session都是用来跟踪浏览器用户身份的会话方式，但是两者的应用场景不太一样。</p><p><strong>Cookie 一般用来保存用户信息</strong> 比如①我们在 Cookie 中保存已经登录过得用户信息，下次访问网站的时候页面可以自动帮你登录的一些基本信息给填了；②一般的网站都会有保持登录也就是说下次你再访问网站的时候就不需要重新登录了，这是因为用户登录的时候我们可以存放了一个 Token 在 Cookie 中，下次登录的时候只需要根据 Token 值来查找用户即可(为了安全考虑，重新登录一般要将 Token 重写)；③登录一次网站后访问网站其他页面不需要重新登录。<strong>Session 的主要作用就是通过服务端记录用户的状态。</strong> 典型的场景是购物车，当你要添加商品到购物车的时候，系统不知道是哪个用户操作的，因为 HTTP 协议是无状态的。服务端给特定的用户创建特定的 Session 之后就可以标识这个用户并且跟踪这个用户了。</p><p>Cookie 数据保存在客户端(浏览器端)，Session 数据保存在服务器端。</p><p>Cookie 存储在客户端中，而Session存储在服务器上，相对来说 Session 安全性更高。如果要在 Cookie 中存储一些敏感信息，不要直接写入 Cookie 中，最好能将 Cookie 信息加密然后使用到的时候再去服务器端解密。</p><h3 id="_3-1-13-http-1-0和http-1-1的主要区别是什么" tabindex="-1"><a class="header-anchor" href="#_3-1-13-http-1-0和http-1-1的主要区别是什么" aria-hidden="true">#</a> 3.1.13 HTTP 1.0和HTTP 1.1的主要区别是什么?</h3>',12),q={href:"https://mp.weixin.qq.com/s/GICbiyJpINrHZ41u_4zT-A?",target:"_blank",rel:"noopener noreferrer"},w=a('<p>HTTP1.0最早在网页中使用是在1996年，那个时候只是使用一些较为简单的网页上和网络请求上，而HTTP1.1则在1999年才开始广泛应用于现在的各大浏览器网络请求中，同时HTTP1.1也是当前使用最为广泛的HTTP协议。 主要区别主要体现在：</p><ol><li><strong>长连接</strong> : <strong>在HTTP/1.0中，默认使用的是短连接</strong>，也就是说每次请求都要重新建立一次连接。HTTP 是基于TCP/IP协议的,每一次建立或者断开连接都需要三次握手四次挥手的开销，如果每次请求都要这样的话，开销会比较大。因此最好能维持一个长连接，可以用个长连接来发多个请求。<strong>HTTP 1.1起，默认使用长连接</strong> ,默认开启Connection： keep-alive。 <strong>HTTP/1.1的持续连接有非流水线方式和流水线方式</strong> 。流水线方式是客户在收到HTTP的响应报文之前就能接着发送新的请求报文。与之相对应的非流水线方式是客户在收到前一个响应后才能发送下一个请求。</li><li><strong>错误状态响应码</strong> :在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。</li><li><strong>缓存处理</strong> :在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。</li><li><strong>带宽优化及网络连接的使用</strong> :HTTP1.0中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。</li></ol><h3 id="_3-1-12-uri和url的区别是什么" tabindex="-1"><a class="header-anchor" href="#_3-1-12-uri和url的区别是什么" aria-hidden="true">#</a> 3.1.12 URI和URL的区别是什么?</h3><ul><li>URI(Uniform Resource Identifier) 是统一资源标志符，可以唯一标识一个资源。</li><li>URL(Uniform Resource Location) 是统一资源定位符，可以提供该资源的路径。它是一种具体的 URI，即 URL 可以用来标识一个资源，而且还指明了如何 locate 这个资源。</li></ul><p>URI的作用像身份证号一样，URL的作用更像家庭住址一样。URL是一种具体的URI，它不仅唯一标识资源，而且还提供了定位该资源的信息。</p><h3 id="_3-1-13-http-和-https-的区别" tabindex="-1"><a class="header-anchor" href="#_3-1-13-http-和-https-的区别" aria-hidden="true">#</a> 3.1.13 HTTP 和 HTTPS 的区别？</h3><ol><li><strong>端口</strong> ：HTTP的URL由“http://”起始且默认使用端口80，而HTTPS的URL由“https://”起始且默认使用端口443。</li><li><strong>安全性和资源消耗：</strong> HTTP协议运行在TCP之上，所有传输的内容都是明文，客户端和服务器端都无法验证对方的身份。HTTPS是运行在SSL/TLS之上的HTTP协议，SSL/TLS 运行在TCP之上。所有传输的内容都经过加密，加密采用对称加密，但对称加密的密钥用服务器方的证书进行了非对称加密。所以说，HTTP 安全性没有 HTTPS高，但是 HTTPS 比HTTP耗费更多服务器资源。 <ul><li>对称加密：密钥只有一个，加密解密为同一个密码，且加解密速度快，典型的对称加密算法有DES、AES等；</li><li>非对称加密：密钥成对出现（且根据公钥无法推知私钥，根据私钥也无法推知公钥），加密解密使用不同密钥（公钥加密需要私钥解密，私钥加密需要公钥解密），相对对称加密速度较慢，典型的非对称加密算法有RSA、DSA等。</li></ul></li></ol><h3 id="建议" tabindex="-1"><a class="header-anchor" href="#建议" aria-hidden="true">#</a> 建议</h3><p>非常推荐大家看一下 《图解HTTP》 这本书，这本书页数不多，但是内容很是充实，不管是用来系统的掌握网络方面的一些知识还是说纯粹为了应付面试都有很大帮助。下面的一些文章只是参考。大二学习这门课程的时候，我们使用的教材是 《计算机网络第七版》（谢希仁编著），不推荐大家看这本教材，书非常厚而且知识偏理论，不确定大家能不能心平气和的读完。</p><h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h3>',10),N={href:"https://blog.csdn.net/qq_16209077/article/details/52718250",target:"_blank",rel:"noopener noreferrer"},y={href:"https://blog.csdn.net/zixiaomuwu/article/details/60965466",target:"_blank",rel:"noopener noreferrer"},U={href:"https://blog.csdn.net/turn__back/article/details/73743641",target:"_blank",rel:"noopener noreferrer"},B={href:"https://mp.weixin.qq.com/s/GICbiyJpINrHZ41u_4zT-A?",target:"_blank",rel:"noopener noreferrer"};function j(v,D){const r=i("ExternalLinkIcon");return s(),l("div",null,[p,d,c,e("blockquote",null,[g,e("p",null,[T,t(" Github 70k Star 项目 "),e("strong",null,[e("a",P,[t("JavaGuide"),n(r)])]),t("（公众号同名） 作者。每周都会在公众号更新一些自己原创干货。公众号后台回复“1”领取Java工程师必备学习资料+面试突击pdf。")])]),u,e("blockquote",null,[e("p",null,[t("域名系统(Domain Name System缩写 DNS，Domain Name被译为域名)是因特网的一项核心服务，它作为可以将域名和IP地址相互映射的一个分布式数据库，能够使人更方便的访问互联网，而不用去记住能够被机器直接读取的IP数串。（百度百科）例如：一个公司的 Web 网站可看作是它在网上的门户，而域名就相当于其门牌地址，通常域名都使用该公司的名称或简称。例如上面提到的微软公司的域名，类似的还有：IBM 公司的域名是 "),e("a",_,[t("www.ibm.com"),n(r)]),t("、Oracle 公司的域名是 "),e("a",f,[t("www.oracle.com"),n(r)]),t("、Cisco公司的域名是 "),e("a",b,[t("www.cisco.com"),n(r)]),t(" 等。")])]),C,e("p",null,[t("上面我们对计算机网络的五层体系结构有了初步的了解，下面附送一张七层体系结构图总结一下。图片来源："),e("a",m,[t("https://blog.csdn.net/yaopeng_2005/article/details/7064869"),n(r)])]),H,e("p",null,[t("上面讲的比较概括，推荐一篇讲的比较细致的文章："),e("a",S,[t("https://blog.csdn.net/qzcsu/article/details/72861891"),n(r)])]),x,e("ul",null,[e("li",null,[e("a",k,[t("https://segmentfault.com/a/1190000006879700"),n(r)])])]),A,e("p",null,[t("—— "),e("a",I,[t("《HTTP长连接、短连接究竟是什么？》"),n(r)])]),R,e("blockquote",null,[e("p",null,[t("这部分回答引用这篇文章 "),e("a",q,[t("https://mp.weixin.qq.com/s/GICbiyJpINrHZ41u_4zT-A?"),n(r)]),t(" 的一些内容。")])]),w,e("ul",null,[e("li",null,[e("a",N,[t("https://blog.csdn.net/qq_16209077/article/details/52718250"),n(r)])]),e("li",null,[e("a",y,[t("https://blog.csdn.net/zixiaomuwu/article/details/60965466"),n(r)])]),e("li",null,[e("a",U,[t("https://blog.csdn.net/turn__back/article/details/73743641"),n(r)])]),e("li",null,[e("a",B,[t("https://mp.weixin.qq.com/s/GICbiyJpINrHZ41u_4zT-A?"),n(r)])])])])}const M=o(h,[["render",j],["__file","index.html.vue"]]);export{M as default};
