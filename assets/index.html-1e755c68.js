import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as i,a as n,b as s,e,f as t}from"./app-21ce620e.js";const o={},u=n("p",null,[n("strong",null,"Docker Compose介绍")],-1),r=n("p",null,"使用微服务架构的应用系统一般包含若干个微服务，每个微服务一般都会部署多个实例。如果每个微服务都要手动启停，那么效率之低、维护量之大可想而知。本节课将讨论如何使用 Docker Compose来轻松、高效地管理容器。为了简单起见将 Docker Compose简称为 Compose。",-1),d=n("p",null,"Compose 是一个用于定义和运行多容器的Docker应用的工具。使用Compose，你可以在一个配置文件（yaml格式）中配置你应用的服务，然后使用一个命令，即可创建并启动配置中引用的所有服务。下面我们进入Compose的实战吧",-1),m=n("p",null,[n("strong",null,"Docker Compose的安装")],-1),k={href:"https://docs.docker.com/compose/install/",target:"_blank",rel:"noopener noreferrer"},v=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># docker compose安装步骤</span>
 <span class="token function">sudo</span> yum update
 <span class="token function">sudo</span> yum <span class="token function">install</span> docker-compose-plugin
 <span class="token comment"># 查看版本</span>
 <span class="token function">docker</span> compose version
 
 <span class="token function">rpm</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">--nodeps</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> docker-compose-plugin<span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Docker Compose入门示例</strong></p><p>Compose的使用非常简单，只需要编写一个docker-compose.yml，然后使用docker-compose 命令操作即可。docker-compose.yml描述了容器的配置，而docker-compose 命令描述了对容器的操作。我们首先通过一个示例快速入门：</p><p>还记得上节课，我们使用Dockerfile为项目microservice-eureka-server构建Docker镜像吗？我们还以此项目为例测试</p><ul><li>我们在microservice-eureka-server-0.0.1-SNAPSHOT.jar所在目录的上一级目录，创建docker-compose.yml 文件。</li></ul><p>目录树结构如下：</p><figure><img src="https://img.jssjqd.cn/202211101632515.png" alt="image-20221110163224784" tabindex="0" loading="lazy"><figcaption>image-20221110163224784</figcaption></figure><ul><li>然后在docker-compose.yml 中添加内容如下：</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">eureka</span><span class="token punctuation">:</span>             <span class="token comment">#指定服务名</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> microservice<span class="token punctuation">-</span>eureka<span class="token punctuation">-</span>server<span class="token punctuation">:</span>0.0.1  <span class="token comment">#指定镜像名称</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./eureka   <span class="token comment">#指定Dockfile所在路径</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8761:8761&quot;</span>   <span class="token comment">#指定端口映射</span>
    <span class="token key atrule">expose</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token number">8761</span>          <span class="token comment">#声明容器对外暴露的端口 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在docker-compose.yml 所在路径执行：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose up （后面加-d可以后台启动，加--build会重新构建镜像<span class="token punctuation">)</span>              
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://img.jssjqd.cn/202211101633530.png" alt="image-20221110163340129" tabindex="0" loading="lazy"><figcaption>image-20221110163340129</figcaption></figure><p>如上图，compose启动会做几件事：</p><p>1、创建一个默认的网络app_default，默认以compose所在文件目录名加&quot;_default&quot;命名，compose内的所有容器都会加入此网络，可以相互用服务名访问。</p><p>2、如果镜像 microservice-eureka-server:0.0.1 不存在先构建镜像，如果镜像存在则不构建，加上 --build 参数可以强制先构建镜像，如果镜像之前构建过且构建文件没有变化或构建的内容没有变化，就算加上 --build 参数也不会重新构建。</p><p>3、根据构建的镜像创建一个名称叫 app_eureka_1 的容器。</p><p>4、启动容器。</p>`,17),b={href:"http://xn--IP-wz2c754c5qn:8761/",target:"_blank",rel:"noopener noreferrer"},g=t(`<p><strong>Docker Compose管理容器的结构</strong></p><p>Docker Compose将所管理的容器分为三层，<strong>分别是工程（ project），服务（service）以及容器（ container）</strong>。 Docker Compose运行目录下的所有文件（ docker-compose.yml、 extends文件或环境变量文件等）组成一个工程（默认为 docker-compose.yml所在目录的目录名称）。一个工程可包含多个服务，每个服务中定义了容器运行的镜像、参数和依赖，一个服务可包括多个容器实例。</p><p>上节示例里工程名称是 docker-compose.yml 所在的目录名。该工程包含了1个服务，服务名称是 eureka，执行 docker-compose up时，启动了eureka服务的1个容器实例。</p><p>同一个docker compose内部的容器之间可以用服务名相互访问，<strong>服务名就相当于hostname，可以直接 ping 服务名，得到的就是服务对应容器的ip，如果服务做了扩容，一个服务对应了多个容器，则 ping 服务名 会轮询访问服务对应的每台容器ip ，docker底层用了LVS等技术帮我们实现这个负载均衡</strong>。</p><p><strong>docker-compose.yml常用指令</strong></p><p><strong>image</strong></p><p>指定镜像名称或者镜像id，如果该镜像在本地不存在，Compose会尝试pull下来。</p><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> image: <span class="token function">java</span>              
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>build</strong></p><p>指定Dockerfile文件的路径。可以是一个路径，例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>build: ./dir              
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以是一个对象，用以指定Dockerfile和参数，例如：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">build</span><span class="token punctuation">:</span>
  <span class="token key atrule">context</span><span class="token punctuation">:</span> ./dir
  <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile<span class="token punctuation">-</span>alternate
  <span class="token key atrule">args</span><span class="token punctuation">:</span>
    <span class="token key atrule">buildno</span><span class="token punctuation">:</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>command</strong></p><p>覆盖容器启动后默认执行的命令。</p><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>command: bundle <span class="token builtin class-name">exec</span> thin <span class="token parameter variable">-p</span> <span class="token number">3000</span>              
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以是一个list，类似于Dockerfile总的CMD指令，格式如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>command: <span class="token punctuation">[</span>bundle, exec, thin, -p, <span class="token number">3000</span><span class="token punctuation">]</span>              
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>links</strong></p><p>显示链接到其他服务中的容器。可以指定服务名称和链接的别名使用SERVICE:ALIAS 的形式，或者只指定服务名称，示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">web</span><span class="token punctuation">:</span>
  <span class="token key atrule">links</span><span class="token punctuation">:</span>
   <span class="token punctuation">-</span> db
   <span class="token punctuation">-</span> db<span class="token punctuation">:</span>database
   <span class="token punctuation">-</span> redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>external_links</strong></p><p>表示链接到docker-compose.yml外部的容器，甚至并非Compose管理的容器，特别是对于那些提供共享容器或共同服务。格式跟links类似，示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">external_links</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> redis_1
 <span class="token punctuation">-</span> project_db_1<span class="token punctuation">:</span>mysql
 <span class="token punctuation">-</span> project_db_1<span class="token punctuation">:</span>postgresql          
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>ports</strong></p><p>暴露端口信息。使用宿主端口:容器端口的格式，或者仅仅指定容器的端口（此时宿主机将会随机指定端口），类似于docker run -p ，示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">ports</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;3000&quot;</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;3000-3005&quot;</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;8000:8000&quot;</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;9090-9091:8080-8081&quot;</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;49100:22&quot;</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;127.0.0.1:8001:8001&quot;</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;127.0.0.1:5000-5010:5000-5010&quot;</span>        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>expose</strong></p><p>暴露端口，只将端口暴露给连接的服务，而不暴露给宿主机，示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">expose</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;3000&quot;</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;8000&quot;</span>            
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>volumes</strong></p><p>卷挂载路径设置。可以设置宿主机路径 （HOST:CONTAINER） 或加上访问模式 （HOST:CONTAINER:ro）。示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token comment"># Just specify a path and let the Engine create a volume</span>
  <span class="token punctuation">-</span> /var/lib/mysql

  <span class="token comment"># Specify an absolute path mapping</span>
  <span class="token punctuation">-</span> /opt/data<span class="token punctuation">:</span>/var/lib/mysql

  <span class="token comment"># Path on the host, relative to the Compose file</span>
  <span class="token punctuation">-</span> ./cache<span class="token punctuation">:</span>/tmp/cache

  <span class="token comment"># User-relative path</span>
  <span class="token punctuation">-</span> ~/configs<span class="token punctuation">:</span>/etc/configs/<span class="token punctuation">:</span>ro

  <span class="token comment"># Named volume</span>
  <span class="token punctuation">-</span> datavolume<span class="token punctuation">:</span>/var/lib/mysql       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>volumes_from</strong></p><p>从另一个服务或者容器挂载卷。可以指定只读或者可读写，如果访问模式没有指定，则默认是可读写。示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">volumes_from</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> service_name
 <span class="token punctuation">-</span> service_name<span class="token punctuation">:</span>ro
 <span class="token punctuation">-</span> container<span class="token punctuation">:</span>container_name
 <span class="token punctuation">-</span> container<span class="token punctuation">:</span>container_name<span class="token punctuation">:</span>rw      
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>environment</strong></p><p>设置环境变量。可以使用数组或者字典两种方式。只有一个key的环境变量可以在运行Compose的机器上找到对</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">environment</span><span class="token punctuation">:</span>
  <span class="token key atrule">RACK_ENV</span><span class="token punctuation">:</span> development
  <span class="token key atrule">SHOW</span><span class="token punctuation">:</span> <span class="token string">&#39;true&#39;</span>
  <span class="token key atrule">SESSION_SECRET</span><span class="token punctuation">:</span>

<span class="token key atrule">environment</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> RACK_ENV=development
  <span class="token punctuation">-</span> SHOW=true
  <span class="token punctuation">-</span> SESSION_SECRET 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>env_file</strong></p><p>从文件中获取环境变量，可以为单独的文件路径或列表。如果通过 docker-compose -f FILE 指定了模板文件，则 env_file 中路径会基于模板文件路径。如果有变量名称与 environment 指令冲突，则以envirment 为准。示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">env_file</span><span class="token punctuation">:</span> .env

<span class="token key atrule">env_file</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> ./common.env
  <span class="token punctuation">-</span> ./apps/web.env
  <span class="token punctuation">-</span> /opt/secrets.env    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>extends</strong></p><p>继承另一个服务，基于已有的服务进行扩展。</p><p><strong>net</strong></p><p>设置网络模式。示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>net: &quot;bridge&quot;
net: &quot;host&quot;
net: &quot;none&quot;
net: &quot;container:[service name or container name/id]&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>dns</strong></p><p>配置dns服务器。可以是一个值，也可以是一个列表。示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">dns</span><span class="token punctuation">:</span> 8.8.8.8
<span class="token key atrule">dns</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> 8.8.8.8
  <span class="token punctuation">-</span> 9.9.9.9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>dns_search</strong></p><p>配置DNS的搜索域，可以是一个值，也可以是一个列表，示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">dns_search</span><span class="token punctuation">:</span> example.com
<span class="token key atrule">dns_search</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> dc1.example.com
  <span class="token punctuation">-</span> dc2.example.com              
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>其他</strong></p>`,56),y={href:"https://docs.docker.com/compose/compose-file/",target:"_blank",rel:"noopener noreferrer"},_=t(`<p><strong>用Docker Compose编排Spring Cloud电商项目微服务</strong></p><p>如果微服务较多，则可以用docker compose来统一编排，接下来我们用docker compose来统一编排电商项目的五个微服务：tulingmall-authcenter，tulingmall-gateway，tulingmall-member，tulingmall-order，tulingmall-product</p><p><strong>编排电商项目依赖环境</strong></p><p>1、创建一个空目录docker-mall</p><p>2、在docker-mall目录下新建一个编排文件docker-compose-env.yml，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">mysql</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">command</span><span class="token punctuation">:</span> mysqld <span class="token punctuation">-</span><span class="token punctuation">-</span>character<span class="token punctuation">-</span>set<span class="token punctuation">-</span>server=utf8mb4 <span class="token punctuation">-</span><span class="token punctuation">-</span>collation<span class="token punctuation">-</span>server=utf8mb4_unicode_ci  <span class="token comment">#覆盖容器启动后默认执行的启动mysql命令</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always  <span class="token comment">#关机或者重启机器时，docker同时重启容器，一般mysql服务可以这么设置，保持服务一直都在</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> root <span class="token comment">#设置root帐号密码</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 3306<span class="token punctuation">:</span><span class="token number">3306</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /mydata/mysql/data/db<span class="token punctuation">:</span>/var/lib/mysql <span class="token comment">#数据文件挂载</span>
      <span class="token punctuation">-</span> /mydata/mysql/data/conf<span class="token punctuation">:</span>/etc/mysql/conf.d <span class="token comment">#配置文件挂载</span>
      <span class="token punctuation">-</span> /mydata/mysql/log<span class="token punctuation">:</span>/var/log/mysql <span class="token comment">#日志文件挂载</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>   
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span><span class="token number">5.0</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server <span class="token punctuation">-</span><span class="token punctuation">-</span>appendonly yes  
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /mydata/redis/data<span class="token punctuation">:</span>/data <span class="token comment">#数据文件挂载</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 6379<span class="token punctuation">:</span><span class="token number">6379</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> rabbitmq<span class="token punctuation">:</span>3.7.25<span class="token punctuation">-</span>management
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rabbitmq
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /mydata/rabbitmq/data<span class="token punctuation">:</span>/var/lib/rabbitmq <span class="token comment">#数据文件挂载</span>
      <span class="token punctuation">-</span> /mydata/rabbitmq/log<span class="token punctuation">:</span>/var/log/rabbitmq <span class="token comment">#日志文件挂载</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 5672<span class="token punctuation">:</span><span class="token number">5672</span>
      <span class="token punctuation">-</span> 15672<span class="token punctuation">:</span><span class="token number">15672</span>
  <span class="token key atrule">elasticsearch</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> elasticsearch<span class="token punctuation">:</span>6.4.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> elasticsearch
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;cluster.name=elasticsearch&quot;</span> <span class="token comment">#设置集群名称为elasticsearch</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;discovery.type=single-node&quot;</span> <span class="token comment">#以单一节点模式启动</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;</span> <span class="token comment">#设置使用jvm内存大小，稍微配置大点，不然有可能启动不成功</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /mydata/elasticsearch/plugins<span class="token punctuation">:</span>/usr/share/elasticsearch/plugins <span class="token comment">#插件文件挂载</span>
      <span class="token punctuation">-</span> /mydata/elasticsearch/data<span class="token punctuation">:</span>/usr/share/elasticsearch/data <span class="token comment">#数据文件挂载</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 9200<span class="token punctuation">:</span><span class="token number">9200</span>
      <span class="token punctuation">-</span> 9300<span class="token punctuation">:</span><span class="token number">9300</span>
  <span class="token key atrule">kibana</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> kibana<span class="token punctuation">:</span>6.4.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> kibana
    <span class="token key atrule">links</span><span class="token punctuation">:</span>  <span class="token comment">#同一个compose文件管理的服务可以直接用服务名访问，如果要给服务取别名则可以用links实现，如下面的es就是elasticsearch服务的别名</span>
      <span class="token punctuation">-</span> elasticsearch<span class="token punctuation">:</span>es <span class="token comment">#可以用es这个域名访问elasticsearch服务</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elasticsearch <span class="token comment">#kibana在elasticsearch启动之后再启动</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;elasticsearch.hosts=http://es:9200&quot;</span> <span class="token comment">#设置访问elasticsearch的地址</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 5601<span class="token punctuation">:</span><span class="token number">5601</span>
  <span class="token key atrule">logstash</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> logstash<span class="token punctuation">:</span>6.4.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> logstash
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /mydata/logstash/logstash<span class="token punctuation">-</span>springboot.conf<span class="token punctuation">:</span>/usr/share/logstash/pipeline/logstash.conf <span class="token comment">#挂载logstash的配置文件，docker对单个文件的挂载需要先在宿主机建好对应文件才能挂载成功</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elasticsearch <span class="token comment">#kibana在elasticsearch启动之后再启动</span>
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elasticsearch<span class="token punctuation">:</span>es <span class="token comment">#可以用es这个域名访问elasticsearch服务</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 4560<span class="token punctuation">:</span><span class="token number">4560</span>
  <span class="token key atrule">mongo</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mongo<span class="token punctuation">:</span><span class="token number">3.2</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mongo
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /mydata/mongo/db<span class="token punctuation">:</span>/data/db <span class="token comment">#数据文件挂载</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 27017<span class="token punctuation">:</span><span class="token number">27017</span>
  <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nacos/nacos<span class="token punctuation">-</span>server<span class="token punctuation">:</span>1.4.2
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> nacos
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> MODE=standalone
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /mydata/nacos/logs/<span class="token punctuation">:</span>/home/nacos/logs
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8848:8848&quot;</span>
  <span class="token key atrule">zookeeper</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">:</span><span class="token number">3.5</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 2181<span class="token punctuation">:</span><span class="token number">2181</span> 
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /mydata/zookeeper/data<span class="token punctuation">:</span>/data
      <span class="token punctuation">-</span> /mydata/zookeeper/conf<span class="token punctuation">:</span>/conf
      
  <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> rocketmqinc/rocketmq
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rocketmq
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always    
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 9876<span class="token punctuation">:</span><span class="token number">9876</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /mydata/rocketmq/logs<span class="token punctuation">:</span>/home/rocketmq/logs
      <span class="token punctuation">-</span> /mydata/rocketmq/store<span class="token punctuation">:</span>/home/rocketmq/store
    <span class="token key atrule">command</span><span class="token punctuation">:</span> sh mqnamesrv
  <span class="token key atrule">broker</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> rocketmqinc/rocketmq
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rmqbroker
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always    
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 10909<span class="token punctuation">:</span><span class="token number">10909</span>
      <span class="token punctuation">-</span> 10911<span class="token punctuation">:</span><span class="token number">10911</span>
      <span class="token punctuation">-</span> 10912<span class="token punctuation">:</span><span class="token number">10912</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /mydata/rocketmq/logs<span class="token punctuation">:</span>/home/rocketmq/logs
      <span class="token punctuation">-</span> /mydata/rocketmq/store<span class="token punctuation">:</span>/home/rocketmq/store
      <span class="token punctuation">-</span> /mydata/rocketmq/conf/broker.conf<span class="token punctuation">:</span>/opt/rocketmq<span class="token punctuation">-</span>4.4.0/conf/broker.conf  <span class="token comment">#这个配置需要先在宿主机对应目录放好broker.conf配置文件,文件内容参考下面文档</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> sh mqbroker <span class="token punctuation">-</span>n namesrv<span class="token punctuation">:</span>9876 <span class="token punctuation">-</span>c ../conf/broker.conf
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> rocketmq
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> JAVA_HOME=/usr/lib/jvm/jre
  <span class="token key atrule">console</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> styletang/rocketmq<span class="token punctuation">-</span>console<span class="token punctuation">-</span>ng
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rocketmq<span class="token punctuation">-</span>console<span class="token punctuation">-</span>ng
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always    
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8076<span class="token punctuation">:</span><span class="token number">8080</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> rocketmq
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> JAVA_OPTS= <span class="token punctuation">-</span>Dlogging.level.root=info <span class="token punctuation">-</span>Drocketmq.namesrv.addr=rocketmq<span class="token punctuation">:</span><span class="token number">9876</span> 
      <span class="token punctuation">-</span> Dcom.rocketmq.sendMessageWithVIPChannel=false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>broker.conf文件内容如下：</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">brokerName</span> <span class="token punctuation">=</span> <span class="token value attr-value">broker-a</span>
<span class="token key attr-name">brokerId</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">deleteWhen</span> <span class="token punctuation">=</span> <span class="token value attr-value">04</span>
<span class="token key attr-name">fileReservedTime</span> <span class="token punctuation">=</span> <span class="token value attr-value">48</span>
<span class="token key attr-name">brokerRole</span> <span class="token punctuation">=</span> <span class="token value attr-value">ASYNC_MASTER</span>
<span class="token key attr-name">flushDiskType</span> <span class="token punctuation">=</span> <span class="token value attr-value">ASYNC_FLUSH</span>
<span class="token comment"># 宿主机IP</span>
<span class="token key attr-name">brokerIP1</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.65.42   </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、启动compose所有容器，在docker-mall目录执行如下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-env.yml up <span class="token parameter variable">-d</span>              
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>常用的一些docker-compose命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看compose内的容器</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml <span class="token function">ps</span>
<span class="token comment"># 关闭或启动或重启compose内的某个容器</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml stop/start/restart <span class="token operator">&lt;</span>服务名<span class="token operator">&gt;</span>
<span class="token comment"># 关闭或重启compose所有容器</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml stop/restart
<span class="token comment"># 查看compose所有容器的运行日志</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml logs <span class="token parameter variable">-f</span>
<span class="token comment"># 查看compose下某个容器的运行日志</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml logs <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>服务名<span class="token operator">&gt;</span>
<span class="token comment"># 也可以把compose的容器日志输出到日志文件里去，然后用tail -f 随时查看</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml logs <span class="token parameter variable">-f</span> <span class="token operator">&gt;&gt;</span> myDockerCompose.log <span class="token operator">&amp;</span>
<span class="token comment"># 重新构建有变化的镜像并更新到容器再启动</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml up <span class="token parameter variable">--build</span> <span class="token parameter variable">-d</span>
<span class="token comment"># 重新创建docker-compose.yml配置有变化的容器并启动</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml up --force-recreate <span class="token parameter variable">-d</span>
<span class="token comment">#停掉容器再删除容器</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml down        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编排电商微服务</strong></p><p>1、在docker-mall目录下分别创建tulingmall-authcenter，tulingmall-gateway，tulingmall-member，tulingmall-order，tulingmall-product目录。</p><p>2、修改电商项目上面这几个微服务配置文件里的中间件配置为上面docker compose里的服务名，并打好jar包放入上面对应的文件夹。</p><p>以tulingmall-product服务为例，对应修改后的配置文件如下(注意：大家按照自己下载项目的配置文件去修改，不要直接用我这里的配置，有可能版本不对)</p><p>bootstrap.yml文件配置：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> tulingmall<span class="token punctuation">-</span>product
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">config</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> nacos<span class="token punctuation">:</span><span class="token number">8848</span> <span class="token comment">#配置中心的地址</span>
        <span class="token key atrule">file-extension</span><span class="token punctuation">:</span> yml <span class="token comment">#配置文件结尾的配置</span>
        <span class="token key atrule">shared-dataids</span><span class="token punctuation">:</span> tulingmall<span class="token punctuation">-</span>nacos.yml<span class="token punctuation">,</span>tulingmall<span class="token punctuation">-</span>db<span class="token punctuation">-</span>common.yml <span class="token comment">#图灵商城公共配置</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> dev        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>tulingmall-product-dev.yml文件配置：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8866</span>
  <span class="token key atrule">tomcat</span><span class="token punctuation">:</span>
    <span class="token key atrule">max-threads</span><span class="token punctuation">:</span> <span class="token number">100</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> tulingmall<span class="token punctuation">-</span>product
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span>  <span class="token comment">#密码</span>
    <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 5000ms
    <span class="token key atrule">lettuce</span><span class="token punctuation">:</span>
      <span class="token key atrule">pool</span><span class="token punctuation">:</span>
        <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">50</span>
        <span class="token key atrule">max-wait</span><span class="token punctuation">:</span> <span class="token punctuation">-</span>1ms
        <span class="token key atrule">max-idle</span><span class="token punctuation">:</span> <span class="token number">8</span>
        <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">0</span>
        
<span class="token key atrule">management</span><span class="token punctuation">:</span> <span class="token comment">#开启SpringBoot Admin的监控</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">&#39;*&#39;</span>
  <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
    <span class="token key atrule">health</span><span class="token punctuation">:</span>
      <span class="token key atrule">show-details</span><span class="token punctuation">:</span> always

<span class="token key atrule">seata</span><span class="token punctuation">:</span>
  <span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> nacos<span class="token punctuation">:</span><span class="token number">8848</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nacos
  <span class="token key atrule">registry</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nacos
  <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> my_test_tx_group
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">support</span><span class="token punctuation">:</span>
      <span class="token key atrule">spring</span><span class="token punctuation">:</span>
        <span class="token key atrule">datasource-autoproxy</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

<span class="token comment">#zk配置</span>
<span class="token key atrule">zk</span><span class="token punctuation">:</span>
  <span class="token key atrule">curator</span><span class="token punctuation">:</span>
    <span class="token key atrule">retryCount</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment">#重试次数</span>
    <span class="token key atrule">elapsedTimeMs</span><span class="token punctuation">:</span> <span class="token number">5000</span> <span class="token comment">#</span>
    <span class="token key atrule">connectUrl</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">:</span><span class="token number">2181</span> <span class="token comment">#zk地址</span>
    <span class="token key atrule">sessionTimeOutMs</span><span class="token punctuation">:</span> <span class="token number">60000</span> <span class="token comment">#会话超时时间</span>
    <span class="token key atrule">connectionTimeOutMs</span><span class="token punctuation">:</span> <span class="token number">5000</span> <span class="token comment">#连接超时时间        </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>tulingmall-nacos.yml文件配置：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> nacos<span class="token punctuation">:</span><span class="token number">8848</span>      
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>tulingmall-db-common.yml文件配置：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//db<span class="token punctuation">:</span>3306/micromall<span class="token punctuation">?</span>serverTimezone=UTC<span class="token important">&amp;useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-</span><span class="token number">8</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> root
    <span class="token key atrule">druid</span><span class="token punctuation">:</span>
      <span class="token key atrule">initial-size</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment">#连接池初始化大小</span>
      <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment">#最小空闲连接数</span>
      <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">20</span> <span class="token comment">#最大连接数</span>
      <span class="token key atrule">web-stat-filter</span><span class="token punctuation">:</span>
        <span class="token key atrule">exclusions</span><span class="token punctuation">:</span> <span class="token string">&quot;*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*&quot;</span> <span class="token comment">#不统计这些请求数据</span>
      <span class="token key atrule">stat-view-servlet</span><span class="token punctuation">:</span> <span class="token comment">#访问监控网页的登录用户名和密码</span>
        <span class="token key atrule">login-username</span><span class="token punctuation">:</span> druid
        <span class="token key atrule">login-password</span><span class="token punctuation">:</span> druid
<span class="token key atrule">mybatis</span><span class="token punctuation">:</span>
  <span class="token key atrule">mapper-locations</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> classpath<span class="token punctuation">:</span>dao/<span class="token important">*.xml</span>
    <span class="token punctuation">-</span> classpath<span class="token important">*:com/**/mapper/*.xml</span>       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、在每个微服务目录下新建一个Dockerfile，内容如下，以tulingmall-product服务为例，其它微服务都类似修改：</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># 基于哪个镜像</span>
<span class="token instruction"><span class="token keyword">From</span> java:8</span>
<span class="token comment"># 复制文件到容器</span>
<span class="token instruction"><span class="token keyword">ADD</span> tulingmall-product-0.0.1-SNAPSHOT.jar /app.jar</span>
<span class="token comment"># 配置容器启动后执行的命令</span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>,<span class="token string">&quot;-jar&quot;</span>,<span class="token string">&quot;/app.jar&quot;</span>]  </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><p>4、在docker-mall目录下新建微服务编排文件docker-compose-app.yml，内容如下：</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>version: &#39;3.8&#39;
services:
  tulingmall-authcenter:
    image: mall/tulingmall-authcenter:0.0.1  #指定镜像名称
    build: ./tulingmall-authcenter  #指定Dockfile所在路径
    container_name: tulingmall-authcenter  #指定启动容器名称
    ports:
      - 9999:9999
    volumes:
      - /etc/localtime:/etc/localtime:ro  #同步宿主机与容器时间，ro代表readonly只读
    environment:
      - JAVA_TOOL_OPTIONS=-Xmx1g -Xms1g -XX:MaxMetaspaceSize=512m -javaagent:/agent/skywalking-agent.jar -DSW_AGENT_NAME=tulingmall-order -DSW_AGENT_COLLECTOR_BACKEND_SERVICES=192.168.65.204:11800
    external_links:  #访问不在同一个compose文件管理的服务需要用external_links，前提是这些服务都在同一个网络下才能正常访问 
      - nacos:nacos  #可以用nacos这个域名访问nacos服务
      - mysql:db  #可以用db这个域名访问mysql服务
    cap_add:
      - SYS_PTRACE #这个参数是让docker能支持在容器里能执行jdk自带的类似jinfo，jmap这些命令，如果不需要在容器里执行这些命令可以不加
  tulingmall-gateway:
    image: mall/tulingmall-gateway:0.0.1
    build: ./tulingmall-gateway
    container_name: tulingmall-gateway
    ports:
      - 8888:8888
    volumes:
      - /etc/localtime:/etc/localtime:ro #同步宿主机与容器时间
    environment:
      - JAVA_TOOL_OPTIONS=-Xmx1g -Xms1g -XX:MaxMetaspaceSize=512m -javaagent:/agent/skywalking-agent.jar -DSW_AGENT_NAME=tulingmall-order -DSW_AGENT_COLLECTOR_BACKEND_SERVICES=192.168.65.204:11800
    depends_on:
      - tulingmall-authcenter #gateway在authcenter启动之后再启动
    external_links:
      - nacos:nacos
    cap_add:
      - SYS_PTRACE #这个参数是让docker能支持在容器里能执行jdk自带的类似jinfo，jmap这些命令，如果不需要在容器里执行这些命令可以不加
  tulingmall-member:
    image: mall/tulingmall-member:0.0.1
    build: ./tulingmall-member
    container_name: tulingmall-member
    ports:
      - 8877:8877
    volumes:
      - /etc/localtime:/etc/localtime:ro #同步宿主机与容器时间
    environment:
      - JAVA_TOOL_OPTIONS=-Xmx1g -Xms1g -XX:MaxMetaspaceSize=512m -javaagent:/agent/skywalking-agent.jar -DSW_AGENT_NAME=tulingmall-order -DSW_AGENT_COLLECTOR_BACKEND_SERVICES=192.168.65.204:11800
    external_links:
      - nacos:nacos
      - mysql:db #可以用db这个域名访问mysql服务
      - mongo
      - redis
      - rabbitmq
    cap_add:
      - SYS_PTRACE #这个参数是让docker能支持在容器里能执行jdk自带的类似jinfo，jmap这些命令，如果不需要在容器里执行这些命令可以不加
  tulingmall-product:
    image: mall/tulingmall-product:0.0.1
    build: ./tulingmall-product
    container_name: tulingmall-product
    ports:
      - 8866:8866
    volumes:
      - /etc/localtime:/etc/localtime:ro #同步宿主机与容器时间
    environment:
      - JAVA_TOOL_OPTIONS=-Xmx1g -Xms1g -XX:MaxMetaspaceSize=512m -javaagent:/agent/skywalking-agent.jar -DSW_AGENT_NAME=tulingmall-order -DSW_AGENT_COLLECTOR_BACKEND_SERVICES=192.168.65.204:11800
    external_links:
      - nacos:nacos
      - mysql:db #可以用db这个域名访问mysql服务
      - redis
      - zookeeper
    cap_add:
      - SYS_PTRACE #这个参数是让docker能支持在容器里能执行jdk自带的类似jinfo，jmap这些命令，如果不需要在容器里执行这些命令可以不加
  tulingmall-order:
    image: mall/tulingmall-order:0.0.1
    build: ./tulingmall-order
    container_name: tulingmall-order
    ports:
      - 8844:8844
    volumes:
      - /etc/localtime:/etc/localtime:ro #同步宿主机与容器时间
    environment:
      - JAVA_TOOL_OPTIONS=-Xmx1g -Xms1g -XX:MaxMetaspaceSize=512m -javaagent:/agent/skywalking-agent.jar -DSW_AGENT_NAME=tulingmall-order -DSW_AGENT_COLLECTOR_BACKEND_SERVICES=192.168.65.204:11800
    external_links:
      - nacos:nacos
      - mysql:db #可以用db这个域名访问mysql服务
      - redis
      - rabbitmq
      - namesrv:rockermq
    cap_add:
      - SYS_PTRACE #这个参数是让docker能支持在容器里能执行jdk自带的类似jinfo，jmap这些命令，如果不需要在容器里执行这些命令可以不加          
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、启动compose的所有微服务容器，在docker-mall目录执行如下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#这里启动的微服务跟上面启动的mysql，redis这些中间件服务因为都在docker-mall目录下，即都是同一个工程下，默认都在相同的网络下，可以相互访问</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml up <span class="token parameter variable">-d</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>6、访问下微服务的api看是否都正常，访问接口参数参看视频，不一定访问我列的这几个接口，其它的接口也行</p><div class="language-ba line-numbers-mode" data-ext="ba"><pre class="language-ba"><code>1、通过网关访问登录接口获取token，post方式：
http://192.168.65.61:8888/sso/login?username=test&amp;password=test  
2、通过网关访问添加购物车接口，post方式：
http://192.168.65.61:8888/cart/add
3、通过网关访问查询购物车接口，get方式：
http://192.168.65.61:8888/cart/list
4、通过网关访问创建订单接口，post方式：
http://192.168.65.61:8888/order/generateOrder   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>动态扩容微服务(单物理机内扩容)</strong></p><p>有时我们需要扩容微服务，比如我们想把用户和订单微服务各部署两个微服务，则需要将docker-compose.yml里的服务的端口映射和容器名称都注释掉，因为不可能两个订单服务的容器映射到宿主机的同一个端口，修改之后的docker-compose-app.yml内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">tulingmall-authcenter</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mall/tulingmall<span class="token punctuation">-</span>authcenter<span class="token punctuation">:</span>0.0.1  <span class="token comment">#指定镜像名称</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./tulingmall<span class="token punctuation">-</span>authcenter  <span class="token comment">#指定Dockfile所在路径</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> tulingmall<span class="token punctuation">-</span>authcenter  <span class="token comment">#指定启动容器名称</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 9999<span class="token punctuation">:</span><span class="token number">9999</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro  <span class="token comment">#同步宿主机与容器时间，ro代表readonly只读</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> JAVA_TOOL_OPTIONS=<span class="token punctuation">-</span>Xmx1g <span class="token punctuation">-</span>Xms1g <span class="token punctuation">-</span>XX<span class="token punctuation">:</span>MaxMetaspaceSize=256m <span class="token punctuation">-</span>javaagent<span class="token punctuation">:</span>/agent/skywalking<span class="token punctuation">-</span>agent.jar <span class="token punctuation">-</span>DSW_AGENT_NAME=tulingmall<span class="token punctuation">-</span>order <span class="token punctuation">-</span>DSW_AGENT_COLLECTOR_BACKEND_SERVICES=192.168.65.204<span class="token punctuation">:</span><span class="token number">11800</span>
    <span class="token key atrule">external_links</span><span class="token punctuation">:</span>  <span class="token comment">#访问不在同一个compose文件管理的服务需要用external_links，前提是这些服务都在同一个网络下才能正常访问 </span>
      <span class="token punctuation">-</span> nacos<span class="token punctuation">:</span>nacos  <span class="token comment">#可以用nacos这个域名访问nacos服务</span>
      <span class="token punctuation">-</span> mysql<span class="token punctuation">:</span>db  <span class="token comment">#可以用db这个域名访问mysql服务</span>
    <span class="token key atrule">cap_add</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SYS_PTRACE <span class="token comment">#这个参数是让docker能支持在容器里能执行jdk自带的类似jinfo，jmap这些命令，如果不需要在容器里执行这些命令可以不加</span>
  <span class="token key atrule">tulingmall-gateway</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mall/tulingmall<span class="token punctuation">-</span>gateway<span class="token punctuation">:</span>0.0.1
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./tulingmall<span class="token punctuation">-</span>gateway
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> tulingmall<span class="token punctuation">-</span>gateway
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8888<span class="token punctuation">:</span><span class="token number">8888</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro <span class="token comment">#同步宿主机与容器时间</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> JAVA_TOOL_OPTIONS=<span class="token punctuation">-</span>Xmx1g <span class="token punctuation">-</span>Xms1g <span class="token punctuation">-</span>XX<span class="token punctuation">:</span>MaxMetaspaceSize=256m <span class="token punctuation">-</span>javaagent<span class="token punctuation">:</span>/agent/skywalking<span class="token punctuation">-</span>agent.jar <span class="token punctuation">-</span>DSW_AGENT_NAME=tulingmall<span class="token punctuation">-</span>order <span class="token punctuation">-</span>DSW_AGENT_COLLECTOR_BACKEND_SERVICES=192.168.65.204<span class="token punctuation">:</span><span class="token number">11800</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> tulingmall<span class="token punctuation">-</span>authcenter <span class="token comment">#gateway在authcenter启动之后再启动</span>
    <span class="token key atrule">external_links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> nacos<span class="token punctuation">:</span>nacos
    <span class="token key atrule">cap_add</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SYS_PTRACE <span class="token comment">#这个参数是让docker能支持在容器里能执行jdk自带的类似jinfo，jmap这些命令，如果不需要在容器里执行这些命令可以不加</span>
  <span class="token key atrule">tulingmall-member</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mall/tulingmall<span class="token punctuation">-</span>member<span class="token punctuation">:</span>0.0.1
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./tulingmall<span class="token punctuation">-</span>member
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> tulingmall<span class="token punctuation">-</span>member
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8877<span class="token punctuation">:</span><span class="token number">8877</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro <span class="token comment">#同步宿主机与容器时间</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> JAVA_TOOL_OPTIONS=<span class="token punctuation">-</span>Xmx1g <span class="token punctuation">-</span>Xms1g <span class="token punctuation">-</span>XX<span class="token punctuation">:</span>MaxMetaspaceSize=256m <span class="token punctuation">-</span>javaagent<span class="token punctuation">:</span>/agent/skywalking<span class="token punctuation">-</span>agent.jar <span class="token punctuation">-</span>DSW_AGENT_NAME=tulingmall<span class="token punctuation">-</span>order <span class="token punctuation">-</span>DSW_AGENT_COLLECTOR_BACKEND_SERVICES=192.168.65.204<span class="token punctuation">:</span><span class="token number">11800</span>
    <span class="token key atrule">external_links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> nacos<span class="token punctuation">:</span>nacos
      <span class="token punctuation">-</span> mysql<span class="token punctuation">:</span>db <span class="token comment">#可以用db这个域名访问mysql服务</span>
      <span class="token punctuation">-</span> mongo
      <span class="token punctuation">-</span> redis
      <span class="token punctuation">-</span> rabbitmq
    <span class="token key atrule">cap_add</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SYS_PTRACE <span class="token comment">#这个参数是让docker能支持在容器里能执行jdk自带的类似jinfo，jmap这些命令，如果不需要在容器里执行这些命令可以不加</span>
  <span class="token key atrule">tulingmall-product</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mall/tulingmall<span class="token punctuation">-</span>product<span class="token punctuation">:</span>0.0.1
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./tulingmall<span class="token punctuation">-</span>product
<span class="token comment">#    container_name: tulingmall-product</span>
<span class="token comment">#    ports:</span>
<span class="token comment">#      - 8866:8866</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro <span class="token comment">#同步宿主机与容器时间</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> JAVA_TOOL_OPTIONS=<span class="token punctuation">-</span>Xmx1g <span class="token punctuation">-</span>Xms1g <span class="token punctuation">-</span>XX<span class="token punctuation">:</span>MaxMetaspaceSize=256m <span class="token punctuation">-</span>javaagent<span class="token punctuation">:</span>/agent/skywalking<span class="token punctuation">-</span>agent.jar <span class="token punctuation">-</span>DSW_AGENT_NAME=tulingmall<span class="token punctuation">-</span>order <span class="token punctuation">-</span>DSW_AGENT_COLLECTOR_BACKEND_SERVICES=192.168.65.204<span class="token punctuation">:</span><span class="token number">11800</span>
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      replicas<span class="token punctuation">:</span><span class="token number">2</span>
    <span class="token key atrule">external_links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> nacos<span class="token punctuation">:</span>nacos
      <span class="token punctuation">-</span> mysql<span class="token punctuation">:</span>db <span class="token comment">#可以用db这个域名访问mysql服务</span>
      <span class="token punctuation">-</span> redis
      <span class="token punctuation">-</span> zookeeper
    <span class="token key atrule">cap_add</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SYS_PTRACE <span class="token comment">#这个参数是让docker能支持在容器里能执行jdk自带的类似jinfo，jmap这些命令，如果不需要在容器里执行这些命令可以不加</span>
  <span class="token key atrule">tulingmall-order</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mall/tulingmall<span class="token punctuation">-</span>order<span class="token punctuation">:</span>0.0.1
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./tulingmall<span class="token punctuation">-</span>order
<span class="token comment">#    container_name: tulingmall-order</span>
<span class="token comment">#    ports:</span>
<span class="token comment">#      - 8844:8844</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro <span class="token comment">#同步宿主机与容器时间</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> JAVA_TOOL_OPTIONS=<span class="token punctuation">-</span>Xmx1g <span class="token punctuation">-</span>Xms1g <span class="token punctuation">-</span>XX<span class="token punctuation">:</span>MaxMetaspaceSize=256m <span class="token punctuation">-</span>javaagent<span class="token punctuation">:</span>/agent/skywalking<span class="token punctuation">-</span>agent.jar <span class="token punctuation">-</span>DSW_AGENT_NAME=tulingmall<span class="token punctuation">-</span>order <span class="token punctuation">-</span>DSW_AGENT_COLLECTOR_BACKEND_SERVICES=192.168.65.204<span class="token punctuation">:</span><span class="token number">11800</span>
    <span class="token key atrule">external_links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> nacos<span class="token punctuation">:</span>nacos
      <span class="token punctuation">-</span> mysql<span class="token punctuation">:</span>db <span class="token comment">#可以用db这个域名访问mysql服务</span>
      <span class="token punctuation">-</span> redis
      <span class="token punctuation">-</span> rabbitmq
      <span class="token punctuation">-</span> namesrv<span class="token punctuation">:</span>rockermq
    <span class="token key atrule">cap_add</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SYS_PTRACE <span class="token comment">#这个参数是让docker能支持在容器里能执行jdk自带的类似jinfo，jmap这些命令，如果不需要在容器里执行这些命令可以不加</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行如下扩容命令，<strong>服务一旦扩容对应了多个容器，则访问服务名docker会自动帮我们负载均衡去访问服务对应的每台容器</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml up --force-recreate <span class="token parameter variable">-d</span>     <span class="token comment">#必须先正常编排微服务，然后才能动态扩容,文件有变动，需要重新创建容器</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml scale tulingmall-order<span class="token operator">=</span><span class="token number">2</span> tulingmall-product<span class="token operator">=</span><span class="token number">2</span>   
<span class="token comment">#如果要缩容执行如下操作</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose-app.yml scale tulingmall-order<span class="token operator">=</span><span class="token number">1</span> tulingmall-product<span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：docker compose主要用在单物理机内扩容的情况，要做多机扩容还需自己在多个机器上做很多定制化配置，当然，要做多物理机扩容一般都会用docker swarm或kubernetes。</p>`,39);function h(f,q){const a=p("ExternalLinkIcon");return c(),i("div",null,[u,r,d,m,n("p",null,[s("Compose的安装有多种方式，例如通过shell安装、通过pip安装、以及将compose作为容器安装等等。本文讲解通过shell安装的方式。其他安装方式如有兴趣，可以查看Docker的官方文档："),n("a",k,[s("https://docs.docker.com/compose/install/"),e(a)])]),v,n("ul",null,[n("li",null,[s("访问："),n("a",b,[s("http://宿主机IP:8761/"),e(a)]),s(" ，发现可以正常访问eureka主页。")])]),g,n("p",null,[s("docker-compose.yml 还有很多其他命令，这里仅挑选常用命令进行讲解，其它不作赘述。如果感兴趣的，可以参考docker-compose.yml文件官方文档："),n("a",y,[s("https://docs.docker.com/compose/compose-file/"),e(a)])]),_])}const E=l(o,[["render",h],["__file","index.html.vue"]]);export{E as default};
