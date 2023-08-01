import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as n}from"./app-18640bff.js";const o={},r=n(`<p>在 Docker 20.10 及以上版本中，Docker 访问宿主机的方式有所变化：</p><p>在 Docker 命令行中，添加：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>--add-host<span class="token operator">=</span>host.docker.internal:host-gateway
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 docker-compose 中，添加：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>extra_hosts:
- host.docker.internal:host-gateway
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>即可通过 host.docker.internal 域名访问宿主机。</p>`,6),t=[r];function d(c,i){return s(),a("div",null,t)}const h=e(o,[["render",d],["__file","index.html.vue"]]);export{h as default};
