import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as e,f as n}from"./app-18640bff.js";const t={},l=n(`<p>快速梳理电商项目中一些非核心的支撑服务。包括前端的重要流程以及分布式任务调度。课程内容主要是带一些基础比较薄弱的同学快速的熟悉整个电商项目，为后面马上就要开始的微服务内容进行铺垫。</p><p>主要关注点是以下几个问题：</p><ul><li>电商前端重要功能梳理：快速熟悉前端项目的启动方式，路由策略，以及状态保存机制电商登录用户状态同步机制梳理：以这个示例场景熟悉电商项目前后端交互的机制。</li><li>分布式任务调度系统部署及使用：快速部署并开发一个xxljob定时任务。具体的业务会在后续课程中讲解，这里只介绍xxljob的部署及开发方式。</li></ul><h2 id="电商前端项目简介" tabindex="-1"><a class="header-anchor" href="#电商前端项目简介" aria-hidden="true">#</a> 电商前端项目简介</h2><p>电商项目采用前后端分离的架构，前端有两个应用</p><ul><li>mall-admin-web：这个是电商管理系统的前端工程</li><li>tlmall-front：这个是电商项目的前端工程。这两个前端工程都是采用VUE框架开发的前端项目。关于VUE框架的基础知识，比如Nodejs环境搭建、VUE的模版加载、双向绑定等</li></ul><h3 id="前端项目启动方式" tabindex="-1"><a class="header-anchor" href="#前端项目启动方式" aria-hidden="true">#</a> 前端项目启动方式</h3><p><strong>mall-admin-web项目的开发环境启动指令： npm run dev 。 本地可以通过开发环境直接启动。</strong></p><p><strong>tlmall-front项目的开发环境启动指令： npm run serve 。注：需要在本地先安装nodejs，建议版本v14.15.0</strong></p><p>如果第一次启动，需要使用npm install指令下载node依赖。所有依赖会下载到node_modules目录下。</p><p>如果出现错误**Local package.json exists, but node_modules missing, did you mean to install？**可以使用cnpm install指令下载。cnpm指令默认访问的是国内阿里的镜像库资源，比npm更稳定。</p><p>如果不清楚指令，可以查看项目中的package.json文件。里面的scripts部分就对应具体的指令。</p><p>开发环境下可以启动本地调试模式。在IDE中修改前端代码，会即时编译并生效。</p><p>如果要部署到生产环境，可以使用 npm run build(两个项目配的都一样)。Vue会将整个项目编译成压缩的文件，放到项目的dist目录下。后续如果需要执行的话，需要自行部署nginx。将dist目录下的文件全部拷贝到nginx的工作目录中即可执行。nginx中的参考配置如下</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">server</span> <span class="token value attr-value">{</span>
<span class="token key attr-name">	listen</span> <span class="token value attr-value">81;</span>
<span class="token key attr-name">	index</span> <span class="token value attr-value">index.html index.htm index.php;</span>
<span class="token key attr-name">	root</span> <span class="token value attr-value">/www/server/nginx;</span>
<span class="token comment">	#error_page 404 /404. html;</span>
<span class="token key attr-name">	include</span> <span class="token value attr-value">enable-php.conf;</span>
<span class="token key attr-name">	location</span> <span class="token value attr-value">/ {</span>
<span class="token key attr-name">		root</span> <span class="token value attr-value">tlmall - admin;</span>
<span class="token key attr-name">		index</span> <span class="token value attr-value">index.html index.htm index.php;</span>
	}
<span class="token key attr-name">	access_log</span> <span class="token value attr-value">/www/wwwlogs/access.log;</span>
}

<span class="token key attr-name">server</span> <span class="token value attr-value">{</span>
<span class="token key attr-name">	listen</span> <span class="token value attr-value">88;</span>
<span class="token key attr-name">	index</span> <span class="token value attr-value">index.html index.htm index.php;</span>
<span class="token key attr-name">	root</span> <span class="token value attr-value">/www/server/nginx;</span>
<span class="token comment">	#error_page 404 /404. html;</span>
<span class="token key attr-name">	include</span> <span class="token value attr-value">enable-php.conf;</span>
<span class="token key attr-name">	location</span> <span class="token value attr-value">/ {</span>
<span class="token key attr-name">		index</span> <span class="token value attr-value">index.html index.htm index.php;</span>
<span class="token key attr-name">		root</span> <span class="token value attr-value">tlmall - front;</span>
	}
<span class="token key attr-name">	location</span> <span class="token value attr-value">/home/ {</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">Host $http_host;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Real - IP $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">REMOTE - HOST $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Forwarded - For $proxy_add_x_forwarded_for;</span>
<span class="token comment">		#proxy_pass http: //192.168.65.214:8887/home/;</span>
<span class="token key attr-name">		proxy_pass</span> <span class="token value attr-value">http: //192.168.65.214:8888/home/;</span>
	}
<span class="token key attr-name">	location</span> <span class="token value attr-value">/pms/ {</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">Host $http_host;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Real - IP $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">REMOTE - HOST $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Forwarded - For $proxy_add_x_forwarded_for;</span>
<span class="token comment">		#proxy_pass http: //192.168.65.220:8866/pms/;</span>
<span class="token key attr-name">		proxy_pass</span> <span class="token value attr-value">http: //192.168.65.214:8888/pms/;</span>
	}
<span class="token key attr-name">	location</span> <span class="token value attr-value">/cart/ {</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">Host $http_host;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Real - IP $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">REMOTE - HOST $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Forwarded - For $proxy_add_x_forwarded_for;</span>
<span class="token comment">		#proxy_pass http: //192.168.65.165:8855/cart/;</span>
<span class="token key attr-name">		proxy_pass</span> <span class="token value attr-value">http: //192.168.65.214:8888/cart/;</span>
	}
<span class="token key attr-name">	location</span> <span class="token value attr-value">/sso/ {</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">Host $http_host;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Real - IP $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">REMOTE - HOST $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Forwarded - For $proxy_add_x_forwarded_for;</span>
<span class="token comment">		#proxy_pass http: //192.168.65.152:8877/sso/;</span>
<span class="token key attr-name">		proxy_pass</span> <span class="token value attr-value">http: //192.168.65.214:8888/sso/;</span>
	}
<span class="token key attr-name">	location</span> <span class="token value attr-value">/member/ {</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">Host $http_host;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Real - IP $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">REMOTE - HOST $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Forwarded - For $proxy_add_x_forwarded_for;</span>
<span class="token comment">		#proxy_pass http: //192.168.65.152:8877/member/;</span>
<span class="token key attr-name">		proxy_pass</span> <span class="token value attr-value">http: //192.168.65.214:8888/member/;</span>
	}
<span class="token key attr-name">	location</span> <span class="token value attr-value">/order/ {</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">Host $http_host;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Real - IP $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">REMOTE - HOST $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Forwarded - For $proxy_add_x_forwarded_for;</span>
<span class="token comment">		#proxy_pass http: //192.168.65.221:8844/order/;</span>
<span class="token key attr-name">		proxy_pass</span> <span class="token value attr-value">http: //192.168.65.214:8888/order/;</span>
	}
<span class="token key attr-name">	location</span> <span class="token value attr-value">/static/qrcode/ {</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">Host $http_host;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Real - IP $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">REMOTE - HOST $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Forwarded - For $proxy_add_x_forwarded_for;</span>
<span class="token key attr-name">		proxy_pass</span> <span class="token value attr-value">http://192.168.65.221:8844/static/qrcode/;</span>
	}
<span class="token key attr-name">	location</span> <span class="token value attr-value">/es/ {</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">Host $http_host;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Real - IP $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">REMOTE - HOST $remote_addr;</span>
<span class="token key attr-name">		proxy_set_header</span> <span class="token value attr-value">X - Forwarded - For $proxy_add_x_forwarded_for;</span>
<span class="token key attr-name">		proxy_pass</span> <span class="token value attr-value">http://192.168.65.152:8054/;</span>
	}
<span class="token key attr-name">	access_log</span> <span class="token value attr-value">/www/wwwlogs/access.log;</span>
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>88端口为mall-admin-web。 81端口为tlmall-front 192.168.65.214:8888 为网关服务的部署地址。 后端服务地址根据部署情况自行调整。网关模块会对登录状态进行验证后， 再通过微服务进行请求转发。</p></blockquote><h3 id="前端页面路由机制" tabindex="-1"><a class="header-anchor" href="#前端页面路由机制" aria-hidden="true">#</a> 前端页面路由机制</h3><p>这一部分主要是要能通过前端路径快速定位到vue源码。 项目中使用vue-router组件快速进行前端跳转。 核心的配置文件是router.js。这个文件会列出vue框架支持的所有URL。</p><blockquote><p>mall-admin-web中的文件是src /router/index.js</p></blockquote><p>可以通过下图快速进行前端路径定位</p><figure><img src="https://img.jssjqd.cn/202304190722608.png" alt="image-20230419072247282" tabindex="0" loading="lazy"><figcaption>image-20230419072247282</figcaption></figure><h3 id="后端请求路由机制" tabindex="-1"><a class="header-anchor" href="#后端请求路由机制" aria-hidden="true">#</a> 后端请求路由机制</h3><p>vue的前端请求地址都是以/#/开头，后端跳转地址没有#号。</p><p>mall-admin-web的后端地址配置在/config/dev.env.js中。</p>`,24),r=[l];function p(o,i){return s(),e("div",null,r)}const c=a(t,[["render",p],["__file","index.html.vue"]]);export{c as default};
