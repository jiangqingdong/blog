import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as d,c as r,f as a}from"./app-21ce620e.js";const e={},p=a(`<h2 id="订单系统的设计与海量数据处理实战" tabindex="-1"><a class="header-anchor" href="#订单系统的设计与海量数据处理实战" aria-hidden="true">#</a> 订单系统的设计与海量数据处理实战</h2><p>订单系统可以说是整个电商系统中最重要的一个子系统，因此订单数据可以算作电商企业最重要的数据资产。这节课我们来看看在我们的商城系统中订单服务是如何实现的，特别是在设计和实现一个订单系统的过程中有哪些问题是需要特别考虑的。首先概略了解商城系统中的订单系统：</p><p>​ <img src="https://img.jssjqd.cn//202305031623458.png" alt="image-20230503162311856" loading="lazy"></p><p>​ <img src="https://img.jssjqd.cn//202305031623722.png" alt="image-20230503162315875" loading="lazy"></p><p>可以看到，订单系统从代码上来说，分为两个部分：tulingmall-order-curr 订单程序和tulingmall-order-history 历史订单处理程序，数据存储也进行了分库分表。更具体实现我们接下来分析。</p><h3 id="订单系统业务分析" tabindex="-1"><a class="header-anchor" href="#订单系统业务分析" aria-hidden="true">#</a> 订单系统业务分析</h3><p>对于一个合格的订单系统,最基本的要求是什么？数据不能出错。用户的每一次购物，从下单开始到支付、发货,再到收货，流程中的每个环节，都需要同步更新订单数据，每次更新操作可能都需要同时更新好几张表。这些操作可能会随机分发到不同的服务器节点上执行，服务器或网络都有可能会出问题，在这么复杂的情况下，如何保证订单数据不出错呢？</p><p>第一，代码必须是正确的没有Bug，当然这个要求很简单也很复杂，全是bug系统无法正常运行，但是也没有什么系统能保证没有一个bug。当然要确保不能因为代码Bug而导致数据错误。</p><p>第二，要能够正确地使用事务。比如，在创建订单的时候,如果需要同时在订单表和订单商品表中插入数据，那么我们必须在一个数据库事务中执行这些插入数据的INSERT 语句，数据库事务可以确保:执行需要同时进行的操作语句时,要么一起成功,要么一起失败。而实际上，在微服务下，仅仅使用数据库事务是不够的，很多时候还需要分布式事务。后面课程会专门的讲解分布式事务在项目中的实现。</p><p>即使满足了上面列举的这两个基本要求，某些特殊情况也仍然可能会引发数据错误，是什么样的数据错误问题？如何解决呢？都会在本章中讲到。</p><p>在此之前,我们需要首先了解对于一个订单系统而言，它的核心功能和数据结构是怎样的。其实任何一个公司的电商系统，其订单系统的功能都是独一无二的，因为订单系统会基于其业务配置了很多的功能，并且都很复杂。因此我们的电商系统只能化繁为简，聚焦那些最核心的、共通的业务功能和数据模型，并且以此为基础讨论其中的实现技术。</p><h3 id="订单系统的核心功能和数据表" tabindex="-1"><a class="header-anchor" href="#订单系统的核心功能和数据表" aria-hidden="true">#</a> 订单系统的核心功能和数据表</h3><p>本节首先简单梳理一下订单系统所必备的功能，其包含但远远不限于如下功能。</p><p>​ <img src="https://img.jssjqd.cn//202305031623766.png" alt="image-20230503162320314" loading="lazy"></p><p>​ <img src="https://img.jssjqd.cn//202305031623614.png" alt="image-20230503162325108" loading="lazy"></p><p>​ <img src="https://img.jssjqd.cn//202305031632083.png" alt="image-20230503163159093" loading="lazy"></p><p>创建订单，从上面京东的流程可以看到，用户从购物车选择了商品后去结算而创建订单其实包括两个业务步骤，一是订单确认，二是订单提交。订单提交后则进入支付流程。</p><p>随着购物流程推进更新订单状态。</p><p>查询订单。</p><p>为了支撑这些必备功能，一般订单数据库中至少需要具备如下4张表。</p><p><strong>订单主表</strong>：也称订单表，用于保存订单的基本信息，也就是我们的oms_order表。</p><table><thead><tr><th>字段名</th><th>类型</th><th>注释</th></tr></thead><tbody><tr><td>id</td><td>bigint</td><td>订单id</td></tr><tr><td>member_id</td><td>bigint</td><td></td></tr><tr><td>coupon_id</td><td>bigint</td><td></td></tr><tr><td>order_sn</td><td>varchar</td><td>订单编号</td></tr><tr><td>create_time</td><td>datetime</td><td>提交时间</td></tr><tr><td>member_username</td><td>varchar</td><td>用户帐号</td></tr><tr><td>total_amount</td><td>decimal</td><td>订单总金额</td></tr><tr><td>pay_amount</td><td>decimal</td><td>应付金额（实际支付金额）</td></tr><tr><td>freight_amount</td><td>decimal</td><td>运费金额</td></tr><tr><td>promotion_amount</td><td>decimal</td><td>促销优化金额（促销价、满减、阶梯价）</td></tr><tr><td>integration_amount</td><td>decimal</td><td>积分抵扣金额</td></tr><tr><td>coupon_amount</td><td>decimal</td><td>优惠券抵扣金额</td></tr><tr><td>discount_amount</td><td>decimal</td><td>管理员后台调整订单使用的折扣金额</td></tr><tr><td>pay_type</td><td>int</td><td>支付方式：0-&gt;未支付；1-&gt;支付宝；2-&gt;微信</td></tr><tr><td>source_type</td><td>int</td><td>订单来源：0-&gt;PC订单；1-&gt;app订单</td></tr><tr><td>status</td><td>int</td><td>订单状态：0-&gt;待付款；1-&gt;待发货；2-&gt;已发货；3-&gt;已完成；4-&gt;已关闭；5-&gt;无效订单</td></tr><tr><td>order_type</td><td>int</td><td>订单类型：0-&gt;正常订单；1-&gt;秒杀订单</td></tr><tr><td>delivery_company</td><td>varchar</td><td>物流公司(配送方式)</td></tr><tr><td>delivery_sn</td><td>varchar</td><td>物流单号</td></tr><tr><td>auto_confirm_day</td><td>int</td><td>自动确认时间（天）</td></tr><tr><td>integration</td><td>int</td><td>可以获得的积分</td></tr><tr><td>growth</td><td>int</td><td>可以活动的成长值</td></tr><tr><td>promotion_info</td><td>varchar</td><td>活动信息</td></tr><tr><td>bill_type</td><td>int</td><td>发票类型：0-&gt;不开发票；1-&gt;电子发票；2-&gt;纸质发票</td></tr><tr><td>bill_header</td><td>varchar</td><td>发票抬头</td></tr><tr><td>bill_content</td><td>varchar</td><td>发票内容</td></tr><tr><td>bill_receiver_phone</td><td>varchar</td><td>收票人电话</td></tr><tr><td>bill_receiver_email</td><td>varchar</td><td>收票人邮箱</td></tr><tr><td>receiver_name</td><td>varchar</td><td>收货人姓名</td></tr><tr><td>receiver_phone</td><td>varchar</td><td>收货人电话</td></tr><tr><td>receiver_post_code</td><td>varchar</td><td>收货人邮编</td></tr><tr><td>receiver_province</td><td>varchar</td><td>省份/直辖市</td></tr><tr><td>receiver_city</td><td>varchar</td><td>城市</td></tr><tr><td>receiver_region</td><td>varchar</td><td>区</td></tr><tr><td>receiver_detail_address</td><td>varchar</td><td>详细地址</td></tr><tr><td>note</td><td>varchar</td><td>订单备注</td></tr><tr><td>confirm_status</td><td>int</td><td>确认收货状态：0-&gt;未确认；1-&gt;已确认</td></tr><tr><td>delete_status</td><td>int</td><td>删除状态：0-&gt;未删除；1-&gt;已删除</td></tr><tr><td>use_integration</td><td>int</td><td>下单时使用的积分</td></tr><tr><td>payment_time</td><td>datetime</td><td>支付时间</td></tr><tr><td>delivery_time</td><td>datetime</td><td>发货时间</td></tr><tr><td>receive_time</td><td>datetime</td><td>确认收货时间</td></tr><tr><td>comment_time</td><td>datetime</td><td>评价时间</td></tr><tr><td>modify_time</td><td>datetime</td><td>修改时间</td></tr><tr><td>qrcode</td><td>varchar</td><td>支付二维码地址</td></tr><tr><td>gmt_create</td><td>datetime</td><td></td></tr><tr><td>gmt_modified</td><td>datetime</td><td></td></tr><tr><td>version</td><td>int</td><td></td></tr></tbody></table><p><strong>订单商品表</strong>：用于保存订单中的商品信息，也就是我们的oms_order_item表。</p><table><thead><tr><th>字段名</th><th>类型</th><th>注释</th></tr></thead><tbody><tr><td>id</td><td>bigint</td><td></td></tr><tr><td>order_id</td><td>bigint</td><td>订单id</td></tr><tr><td>order_sn</td><td>varchar</td><td>订单编号</td></tr><tr><td>product_id</td><td>bigint</td><td></td></tr><tr><td>product_pic</td><td>varchar</td><td></td></tr><tr><td>product_name</td><td>varchar</td><td></td></tr><tr><td>product_brand</td><td>varchar</td><td></td></tr><tr><td>product_sn</td><td>varchar</td><td></td></tr><tr><td>product_price</td><td>decimal</td><td>销售价格</td></tr><tr><td>product_quantity</td><td>int</td><td>购买数量</td></tr><tr><td>product_sku_id</td><td>bigint</td><td>商品sku编号</td></tr><tr><td>product_sku_code</td><td>varchar</td><td>商品sku条码</td></tr><tr><td>product_category_id</td><td>bigint</td><td>商品分类id</td></tr><tr><td>sp1</td><td>varchar</td><td>商品的销售属性</td></tr><tr><td>sp2</td><td>varchar</td><td></td></tr><tr><td>sp3</td><td>varchar</td><td></td></tr><tr><td>promotion_name</td><td>varchar</td><td>商品促销名称</td></tr><tr><td>promotion_amount</td><td>decimal</td><td>商品促销分解金额</td></tr><tr><td>coupon_amount</td><td>decimal</td><td>优惠券优惠分解金额</td></tr><tr><td>integration_amount</td><td>decimal</td><td>积分优惠分解金额</td></tr><tr><td>real_amount</td><td>decimal</td><td>该商品经过优惠后的分解金额</td></tr><tr><td>gift_integration</td><td>int</td><td></td></tr><tr><td>gift_growth</td><td>int</td><td></td></tr><tr><td>product_attr</td><td>varchar</td><td>商品销售属性:[{&quot;key&quot;:&quot;颜色&quot;,&quot;value&quot;:&quot;颜色&quot;},{&quot;key&quot;:&quot;容量&quot;,&quot;value&quot;:&quot;4G&quot;}]</td></tr><tr><td>gmt_create</td><td>datetime</td><td></td></tr><tr><td>gmt_modified</td><td>datetime</td><td></td></tr></tbody></table><p><strong>订单支付表</strong>：用于保存订单的支付和退款信息。</p><p><strong>订单优惠表</strong>：用于保存订单使用的所有优惠信息。</p><p>这4张表之间的关系是订单主表与后面的几个子表都是一对多的关系，关联的外键就是订单主表的主键，即订单ID。</p><p>在我们的商城系统中，做了适度的改造和简化，表现在：</p><p>因为取消了一般的促销优惠，自然没有专门的订单优惠表；</p><p>订单的是否支付和是否退款直接保存在订单主表中，没有设计单独订单支付表用以保存支付和退款相关信息；</p><p>我们系统中没有单独的库存系统，所以库存扣减由订单系统发起，由产品服务执行实际的扣减库存操作。</p><p>对应到存储上，则是oms_order作为订单主表，其中的status字段表示了订单状态，包括“0-&gt;待付款；1-&gt;待发货；2-&gt;已发货；3-&gt;已完成；4-&gt;已关闭；5-&gt;无效订单”。</p><p>产品的库存则是保存在产品服务tulingmall-product对应数据库tl_mall_goods的pms_sku_stock表中。</p><p>从上面我们对订单的流程描述来看，订单系统的实现其实并不复杂，就是标准的CRUD。</p><p>​ <img src="https://img.jssjqd.cn//202305031623824.png" alt="image-20230503162343315" loading="lazy"></p><p>但是前面我们也说过，某些情况也仍然可能会引发数据错误，是哪些情况呢？我们来一一分析下。</p><h3 id="订单重复下单问题" tabindex="-1"><a class="header-anchor" href="#订单重复下单问题" aria-hidden="true">#</a> 订单重复下单问题</h3><p>仔细分析一下订单创建的场景：订单系统为用户提供创建订单的HTTP接口，用户在浏览器页面上点击“提交订单”按钮，浏览器向订单系统发送一条创建订单的请求，订单系统的后端服务收到请求，向数据库的订单表中插入一条订单数据，至此，订单创建成功。</p><p>那么我们设想一下，用户在点击“提交订单”的按钮时，不小心点了两下，那么浏览器就会向服务端连续发送两条创建订单的请求,最终的结果将会是什么？很自然会创建两条一模一样的订单。这样肯定是不行的，因此我们还需要做好防重工作，怎么做呢？</p><p>可能有人会想到，前端页面上应该防止用户重复提交表单，当用户“提交订单”的按钮后，将该按钮置灰不可用。但是仔细想想，即使前端控制了用户不重复提交，网络错误也有可能会导致重传，很多RPC框架和网关都拥有自动重试机制，所以对于订单服务来说，重复请求的问题是客观存在的。</p><p>解决办法是,让订单服务具备幂等性。什么是幂等性？幂等操作的特点是，操作任意多次执行所产生的影响，均与一次执行所产生的影响相同。也就是说,对于幂等方法，使用同样的参数，对它进行多次调用和一次调用，其对系统产生的影响是一样的。</p><p>例如：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">update</span> tableA <span class="token keyword">set</span> count <span class="token operator">=</span> <span class="token number">10</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个操作多次执行，id 等于1的记录中的 count字段的值都为10，这个操作就是幂等的，我们不用担心这个操作被重复。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">update</span> tableA <span class="token keyword">set</span> count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样的SQL操作就不是幂等的，一旦重复，结果就会产生变化。</p><p>所以，不用担心幂等方法的重复执行会对系统造成任何改变。如果创建订单的服务具备幂等性，那么无论创建订单的请求发送了多少次，正确的结果都是数据库只有一条新创建的订单记录。</p><p>这里又会涉及一个不太好解决的问题：对于订单服务来说，如何判断收到的创建订单的请求是不是重复请求呢？</p><p>在插入订单数据之前，先查询一下订单表里面有没有重复的订单，是不是就可以做出判斯了呢？这个方法看起来容易。实际上却很难实现。原因是我们很难通过SQL的WHERE语句来定义“重复的订单”，如果订单的用户、商品、数量和价格都一样,是否就能认为它们是重复订单呢？这个其实是无法确定的，因为有可能用户就是连续下了两个一模一样的订单。</p><p>这个问题的思路是利用数据库的唯一约束来判断数据是否重复。在数据库的最佳实践中，其中一条是要求数据库的每个表都有主键。在非分库分表的情况下，我们在向数据库的表中插入一条记录的时候，无需提供主键，插入的同时由数据库自动生成一个主键。这样，重复的请求就会导致插入重复的数据。</p><p>表的主键是自带唯一约束的,如果我们在一条INSERT语句中提供了主键,并且这个主键的值已经存在于表中,那么这条INSERT语句就会执行失败,数据也不会成功插入表中。我们可以利用数据库的这种“主键唯一约束”特性，在插入数据的时候带上主键,来解决创建订单服务的幂等性问题。</p><p>具体做法如下：首先，为订单系统增加一个“生成订单号”的服务,这个服务没有参数,返回值就是一个新的、全局唯一的订单号。在用户进入创建订单的页面时，前端页面会先调用这个生成订单号的服务得到一个订单号，在用户提交订单的时候，在创建订单的请求中带着这个订单号。</p><p>这个订单号就是订单表的主键，这样，无论是用户原因,还是网络原因等各种情况导致的重试,这些重复请求中的订单号都是相同的。订单服务在订单表中插入数据的时候，这些重复的INSERT语句中的主键，都是同一个订单号。数据库的主键唯一约束特性就可以保证，只有一次INSERT语句的执行是成功的,这样就实现了创建订单服务的幂等性。</p><p>时序图如下：</p><p>​ <img src="https://img.jssjqd.cn//202305031624090.png" alt="image-20230503162421155" loading="lazy"></p><p>所以，可以看到，在OmsPortalOrderController中专门提供了generateOrderId方法供外部系统获得订单ID。</p><p>​ <img src="https://img.jssjqd.cn//202305031624809.png" alt="image-20230503162424987" loading="lazy"></p><p>而秒杀系统相关的微服务中虽然没有提供类似的generateOrderId方法，但依然注意了避免重复下单问题，在生成订单确认信息时，将预先生成的订单ID传递给了前端订单确认页。</p><p>​ <img src="https://img.jssjqd.cn//202305031624477.png" alt="image-20230503162428651" loading="lazy"></p><p>​ <img src="https://img.jssjqd.cn//202305031624893.png" alt="image-20230503162432018" loading="lazy"></p><p>还有一点需要注意的是，在具体实现时，如果是因为重复订单导致插入订单表的语句失败，那么订单服务就不要再把这个错误返回给前端页面了。否则，就有可能会出现用户点击创建订单按钮后，页面提示创建订单失败，而实际上订单已经创建成功了。正确的做法是,遇到这种情况,订单服务直接返回“订单创建成功”的响应即可。</p><p>要做到这一点，可以捕获java.sql.SQLIntegrityConstraintViolationException或者org.springframework.dao.DuplicateKeyException来实现。</p><h3 id="订单aba问题和解决" tabindex="-1"><a class="header-anchor" href="#订单aba问题和解决" aria-hidden="true">#</a> 订单ABA问题和解决</h3><p>订单系统中，各种更新订单的服务同样也需要具备幂等性。</p><p>更新订单的服务，比如支付、发货等这些步骤中的更新订单操作，最终都会落到订单库上，都是对订单主表进行更新操作。</p><p>比如对支付操作的数据库的更新操作、无论是执行一次还是重复执行多次,订单状态都是已支付，不用我们额外设置任何逻辑，这就是天然幂等性。</p><p>在实现这些更新订单的服务时，还有哪些问题需要特别注意呢？在并发环境下，我们需要特别注意ABA问题。</p><p>什么是更新下的ABA问题呢？我们知道并发编程下的CAS有ABA问题，这个ABA问题和并发的ABA问题有相似之处。我们来看这么一个例子：</p><p>订单支付完成，填入物流单号666提交后，发现填错了，修改成正确的单号888，对于订单服务来说，这里就产生了两个更新订单的请求。</p><p>按照我们的设想，正常情况下，订单中的快递单号会先更新成666，再更新成888，这是没有问题的。但是现实生活有很多不正常的情况，比如，更新成666的请求到了，快递单号更新成666，然后更新成888的请求到了，快递单号又更新成888。但是订单服务在向调用方返回666更新成功的响应时，这个响应在网络传输过程中丢失了。如果调用方没有收到成功响应，触发自动重试逻辑，再次发起更新成666的请求，快递单号将会再次更新成666,这种情况下数据显然就会出错了。这就是ABA问题。</p><p>那么ABA问题应该怎么解决呢？仔细想想并发编程里怎么解决ABA问题的？版本戳。所以这里同样可以使用版本戳。</p><p>为订单主表增加一列，列名可以叫 version、也就是“版本号”的意思。每次查询订单的时候，版本号需要随着订单数据返回给页面。页面在更新数据的请求时,需要把该版本号作为更新请求的参数再带回给订单更新服务。</p><p>订单服务在更新数据的时候需要比较订单当前数据的版本号与消息中的版本号是否一致，如果不一致就拒绝更新数据。如果版本号一致，则还需要在更新数据的同时，把版本号加1。当然需要特别注意的是，“比较版本号、更新数据和把版本号加1”这个过程必须在同一个事务里面执行，只有这一系列操作具备原子性，才能真正保证并发操作的安全性。</p><p>具体的SQL语句参考如下:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">UPDATE</span> orders <span class="token keyword">set</span> tracking_number <span class="token operator">=</span> <span class="token number">666</span><span class="token punctuation">,</span>version <span class="token operator">=</span> version <span class="token operator">+</span> <span class="token number">1</span> <span class="token keyword">WHERE</span> version <span class="token operator">=</span> ?<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>版本号的机制可用于保证，从打开某条订单记录开始，一直到这条订单记录更新成功，这期间不会存在有其他人修改过这条订单数据的情况。因为如果被其他人修改过，数据库中的版本号就会发生改变，那么更新订单的操作就不会执行成功，而只能重新查询新版本的订单数据，然后再尝试更新。</p><p>所以可以看到，在oms_order中专门设计了version字段：</p><p>​ <img src="https://img.jssjqd.cn//202305031624221.png" alt="image-20230503162448313" loading="lazy"></p><p>但是因为牵涉到更新订单的操作未执行成功（表现为update语句返回行数为0）时的重试机制，代码修改较大，所以在OmsOrderMapper.xml和相关订单业务方法中没有实现上述的ABA解决方案，感兴趣的同学可以自行调整。</p><p>总的来说，因为网络、服务器等导致的不确定因素，重试请求是普遍存在且不可避免的问题。具有幂等性的服务可以克服由于重试问题而导致的数据错误。</p><p>所以，总的来说，对于创建订单的服务，可以通过预先生成订单号作为主键,然后利用数据库中“主键唯一约束”的特性，避免重复写入订单，实现创建订单服务的幂等性。对于更新订单的服务，可以通过一个版本号机制，即在每次更新数据之前校验版本号，以及在更新数据的同时自增版本号这样的方式来解决ABA问题,以确保更新订单服务的幂等性。</p><p>通过这样两种具备幂等性的实现方法,我们可以保证,无论是不是重复请求,订单表中的数据都是正确的。</p><p>当然这里讲到的实现订单幂等性的方法，在其他需要实现幂等性的服务中也完全可以套用，只需要这个服务操作的数据保存在数据库中，并且数据表带有主键即可。</p><p>实现服务幂等性的方法，远不止本章介绍的这两种，其实，实现幂等性的方法可分为两大类，一类是通过一些精巧的设计让更新本身就是幂等的，这种方法并不能适用于所有的业务。另一类是利用外部的具备一致性的存储（比如 MySQL）来做冲突检测，在设计幂等方法的时候,通常可以顺着这两个思路来展开。</p><h3 id="读写分离与分库分表" tabindex="-1"><a class="header-anchor" href="#读写分离与分库分表" aria-hidden="true">#</a> 读写分离与分库分表</h3><p>使用Redis 作为MySQL的前置缓存，可以帮助MySQL挡住绝大部分的查询请求。这种方法对于像电商中的商品系统、搜索系统这类与用户关联不大的系统、效果特别好。因为在这些系统中、任何人看到的内容都是一样的，也就是说，对后端服来说，任何人的查询请求和返回的数据都是一样的。在这种情况下，Redis 缓存的命中率非常高，几乎所有的请求都可以命中缓存。</p><p>但是与用户相关的系统（不是用户系统本身，用户信息等相关数据在用户登录时进行缓存，就价值很高），使用缓存的效果就没有那么好了，比如，订单系统、账户系统、购物车系统、订单系统等等。对于这些系统而言，各个用户查询的信息与用户自身相关，即使同一个功能界面，用户看到的数据也是不一样的。</p><p>比如，“我的订单”这个功能，用户看到的都是自己的订单数据。在这种情况下，缓存的命中率就比较低了，会有相当一部分查询请求因为命中不了缓存,穿透到 MySQL 数据库中。</p><p>随着系统的用户数量越来越多,穿透到MySQL 数据库中的读写请求也会越来越多，当单个MySQL支撑不了这么多的并发请求时,该怎么办?</p><h4 id="读写分离" tabindex="-1"><a class="header-anchor" href="#读写分离" aria-hidden="true">#</a> 读写分离</h4><p>读写分离是提升 MySQL 并发能力的首选方案，当单个MySQL无法满足要求的时候，只能用多个MySQL实例来承担大量的读写请求。MySQL与大部分常用的关系型数据库一样,都是典型的单机数据库,不支持分布式部署。用一个单机数据库的多个实例组成一个集群,提供分布式数据库服务,是一件非常困难的事情。</p><p>一个简单且非常有效的是用多个具有相同数据的MySOL实例来分担大量查询请求，也就是“读写分离”。很多系统，特别是互联网系统，数据的读写比例严重不均衡，读写比例一般在9:1到几十比1，即平均每发生几十次查询请求，才会有一次更新请求，那就是说数据库需要应对的绝大部分请求都是只读查询请求。</p><p>分布式存储系统支持分布式写是非常困难的，因为很难解决好数据一致性的问题。但分布式读相对来说就简单得多，能够把数据尽可能实时同步到只读实例上，它们就可以分担大量的查询请求了。</p><p>读写分离的另一个好处是，实施起来相对比较简单。把使用单机MySQL的系统升级为读写分离的多实例架构非常容易，一般不需要修改系统的业务逻辑，只需要简单修改DAO (Data Access Object,一般指应用程序中负责访问数据库的抽象层)层的代码,把对数据库的读写请求分开，请求不同的MySQL实例就可以了。通过读写分离这样一个简单的存储架构升级，数据库支持的并发数量就可以增加几倍到十几倍。所以，当系统的用户数越来越多时，读写分离应该是首要考虑的扩容方案。</p><p>​ <img src="https://img.jssjqd.cn//202305031625056.png" alt="image-20230503162504155" loading="lazy"></p><p>主库负责执行应用程序发来的数据更新请求，然后将数据变更同步到所有的从库中。这样，主库和所有从库中的数据一致，多个从库可以共同分担应用的查询请求。</p><h5 id="读写分离的数据不一致问题" tabindex="-1"><a class="header-anchor" href="#读写分离的数据不一致问题" aria-hidden="true">#</a> 读写分离的数据不一致问题</h5><p>读写分离的一个副作用是，可能会存在数据不一致的问题。原因是数据库中的数据在主库完成更新后，是异步同步到每个从库上的，这个过程会有一个微小的时间差。正常情况下，主从延迟非常小，以几毫秒计。但即使是这样小的延迟，也会导致在某个时刻主库和从库上数据不一致的问题。</p><p>应用程序需要能够接受并克服这种主从不一致的情况，否则就会引发一些由于主从延迟而导致的数据错误。</p><p>回顾我们的订单系统业务，用户对购物车发起商品结算创建订单，进入订单页，打开支付页面进行支付，支付完成后，按道理应该再返回到支付之前的订单页。但如果这时马上自动返回到订单页，就很有可能会出现订单状态还是显示“未支付”的问题。因为支付完成后，订单库的主库中订单状态已经更新了，但订单页查询的从库中这条订单记录的状态可能还未更新，如何解决这种问题呢？</p><p>其实这个问题并没有特别好的技术手段来解决，所以可以看到，稍微上点规模的电商网站并不会支付完成后自动跳到到订单页，而是增加了一个支付完成页面，这个页面其实没有任何新的有效信息，就是告诉你支付成功的信息。如果想再查看一下刚刚支付完成的订单，需要手动选择，这样就能很好地规避主从同步延迟的问题。</p><p>如果是那些数据更新后需要立刻查询的业务，这两个步骤可以放到一个数据库事务中，同一个事务中的查询操作也会被路由到主库，这样就可以规避主从不一致的问题了，还有一种解决方式则是对查询部分单独指定进行主库查询。</p><p>总的来说，对于这种因为主从延迟而带来的数据不一致问题，并没有一种简单方便且通用的技术方案可以解决，对此，我们需要重新设计业务逻辑，尽量规避更新数据后立即去从库查询刚刚更新的数据。</p><h4 id="分库分表" tabindex="-1"><a class="header-anchor" href="#分库分表" aria-hidden="true">#</a> 分库分表</h4><p>除了访问MySQL的并发问题，还要解决海量数据的问题，很多的时候，我们会使用分布式的存储集群，因为MySQI本质上是一个单机数据库，所以很多场景下，其并不适合存储TB级别以上的数据。</p><p>但是绝大部分电商企业的在线交易类业务，比如订单、支付相关的系统，还是无法离开MySQL的。原因是只有MySOL 之类的关系型数据库，才能提供金融级的事务保证。目前的分布式事务的各种解法方案多少都有些不够完善。</p><p>虽然 MySQL 无法支持这么大的数据量，以及这么高的并发需求，但是交易类系统必须用它来保证数据一致性，那么，如何才能解决这个问题呢？这个时候我们就要考虑分片，也就是拆分数据。</p><p>如果一个数据库无法支撑1TB的数据，那就把它拆分成100个库，每个库就只有10GB的数据了。这种拆分操作就是MySOL的分库分表操作。</p><h5 id="如何规划分库分表" tabindex="-1"><a class="header-anchor" href="#如何规划分库分表" aria-hidden="true">#</a> 如何规划分库分表</h5><p>以订单表为例，首先,我们需要思考的问题是，选择分库还是分表，或者两者都有，分库就是把数据拆分到不同的MySQL 数据库实例中，分表就是把数据拆分到一个数据库的多张表里面。</p><p>在考虑到底是选择分厍还是分表之前,我们需要首先明确一个原则，那就是能小拆就小非，能少抖就小多拆。原因很简单，数据拆得越分散,并发和维护就越麻烦，系统出问题的概率也就越大。</p><p>遵循上面这个原则，还需要进一步了解，哪种情况适合分表，哪种情况适合分库。选择分厍或是分表的目的是解决如下两个问题。</p><p>第一，是为了解决因数据量太大而导致查询慢的问题。这里所说的“查询”，其实主要是事务中的查询和更新操作，因为只读的查询可以通过缓存和主从分离来解决。分表主要用于解决因数据量大而导致的查询慢的问题。</p><p>第二，是为了应对高并发的问题。如果一个数据库实例撑不住，就把并发请求分散到多个实例中，所以分库可用于解决高并发的问题。</p><p>简单地说，如果数据量太大，就分表；如果并发请求量高，就分库。一般情况下,我们的解决方案大都需要同时做分库分表,我们可以根据预估的并发量和数据量，分别计算应该拆分成多少个库以及多少张表。</p><h3 id="商城订单服务的实现" tabindex="-1"><a class="header-anchor" href="#商城订单服务的实现" aria-hidden="true">#</a> 商城订单服务的实现</h3><h4 id="数据量" tabindex="-1"><a class="header-anchor" href="#数据量" aria-hidden="true">#</a> 数据量</h4><p>在设计系统，我们预估订单的数量每个月订单2000W，一年的订单数可达2.4亿。而每条订单的大小大致为1KB，按照我们在MySQL中学习到的知识，为了让B+树的高度控制在一定范围，保证查询的性能，每个表中的数据不宜超过2000W。在这种情况下，为了存下2.4亿的订单，我们似乎应该将订单表分为16（12往上取最近的2的幂）张表。</p><p>但是这样设计，有个问题，我们只考虑了订单表，没有考虑订单详情表。我们预估一张订单下的商品平均为10个，那既是一年的订单详情数可以达到24亿，同样以每表2000W记录计算，应该订单详情表为128（120往上取最近的2的幂）张，而订单表和订单详情表虽然记录数上是一对一的关系，但是表之间还是一对一，也就是说订单表也要为128张。经过再三分析，我们最终将订单表和订单详情表的张数定为32张。</p><p>这会导致订单详情表单表的数据量达到8000W，为何要这么设计呢？原因我们后面再说。</p><h4 id="选择分片键" tabindex="-1"><a class="header-anchor" href="#选择分片键" aria-hidden="true">#</a> 选择分片键</h4><p>既然决定订单系统分库分表，则还有一个重要的问题，那就是如何选择一个合适的列作为分表的依据，该列我们一般称为分片键（Sharding Key)。选择合适的分片键和分片算法非常重要，因为其将直接影响分库分表的效果。</p><p>选择分片链有一个最重要的参考因素是我们的业务是如何访问数据的？</p><p>比如我们把订单ID作为分片键来诉分订单表。那么拆分之后,如果按照订单ID来查询订单,就需要先根据订单ID和分片算法,计算所要查的这个订单具体在哪个分片上，也就是哪个库的哪张表中，然后再去那个分片执行查询操作即可。</p><p>但是当用户打开“我的订单”这个页面的时候，它的查询条件是用户ID，由于这里没有订单ID，因此我们无法知道所要查询的订单具体在哪个分片上，也就没法查了。如果要强行查询的话，那就只能把所有的分片都查询一遍，再合并查询结果，这个过程比较麻烦，而且性能很差，对分页也很不友好。</p><p>那么如果是把用户ID作为分片键呢？答案是也会面临同样的问题，使用订单ID作为查询条件时无法定位到具体的分片上。</p><p>这个问题的解决办法是，在生成订单ID的时候，把用户ID的后几位作为订单ID的一部分。这样按订单ID查询的时候，就可以根据订单ID中的用户ID找到分片。 所以在我们的系统中订单ID从唯一ID服务获取ID后，还会将用户ID的后两位拼接，形成最终的订单ID。</p><figure><img src="https://img.jssjqd.cn//202305031625477.png" alt="image-20230503162522657" tabindex="0" loading="lazy"><figcaption>image-20230503162522657</figcaption></figure><p>然而，系统对订单的查询万式，肯定不只是按订单ID或按用户ID查询两种方式。比如如果有商家希望查询自家家店的订单，有与订单相关的各种报表。对订单做了分库分表，就没法解决了。这个问题又该怎么解决呢？</p><p>一般的做法是，把订单里数据同步到其他存储系统中，然后在其他存储系统里解决该问题。比如可以再构建一个以店铺ID作为分片键的只读订单库，专供商家使用。或者数据同步到Hadoop分布式文件系统（HDFS）中，然后通过一些大数据技术生成与订单相关的报表。</p><p>在分片算法上，我们知道常用的有按范围，比如时间范围分片，哈希分片，查表法分片。我们这里直接使用哈希分片，对表的个数32直接取模</p><p>​ <strong><img src="https://img.jssjqd.cn//202305031625877.png" alt="image-20230503162526532" loading="lazy"></strong></p><p>一旦做了分库分表，就会极大地限制数据库的查询能力，原本很简单的查询，分库分表之后，可能就没法实现了。分库分表一定是在数据量和并发请求量大到所有招数都无效的情况下，我们才会采用的最后一招。</p><h4 id="具体实现" tabindex="-1"><a class="header-anchor" href="#具体实现" aria-hidden="true">#</a> 具体实现</h4><p>如何在代码中实现读写分离和分库分表呢？一般来说有三种方法。</p><p>1）纯手工方式：修改应用程序的DAO层代码，定义多个数据源，在代码中需要访问数据库的每个地方指定每个数据库请求的数据源。</p><p>2）组件方式：使用像Sharding-JDBC 这些组件集成在应用程序内，用于代理应用程序的所有数据库请求，并把请求自动路由到对应的数据库实例上。</p><p>3）代理方式:在应用程序和数据库实例之间部署一组数据库代理实例,比如Atlas或Sharding-Proxy。对于应用程序来说,数据库代理把自己伪装成一个单节点的MySQL实例,应用程序的所有数据库请求都将发送给代理，代理分离请求，然后将分离后的请求转发给对应的数据库实例。</p><p>在这三种方式中一般推荐第二种，使用分离组件的方式。采用这种方式,代码侵入非常少,同时还能兼顾性能和稳定性。如果应用程序是一个逻辑非常简单的微服务,简单到只有几个SQL,或者应用程序使用的编程语言没有合适的读写分离组件,那么也可以考虑通过纯手工的方式。</p><p>不推荐使用代理方式(第三种方式），原因是代理方式加长了系统运行时数据库请求的调用链路,会浩成一定的性能损失，而且代理服务本身也可能会出现故障和性能瓶颈等问题。代理方式有一个好处，对应用程序完全透明。</p><p>所以在我们的订单服务中，使用了第二种方式，引入了Sharding-JDBC，考虑要同时支持读写分离和分库分表，配置如下：</p><figure><img src="https://img.jssjqd.cn//202305031625894.png" alt="image-20230503162537937" tabindex="0" loading="lazy"><figcaption>image-20230503162537937</figcaption></figure><figure><img src="https://img.jssjqd.cn//202305031625832.png" alt="image-20230503162541600" tabindex="0" loading="lazy"><figcaption>image-20230503162541600</figcaption></figure><p>在分片键的选择上，订单信息的查询往往会指定订单的ID或者用户ID，所以oms_order的分片键为表中的id、member_id两个字段。而oms_order_item表通过order_id字段和oms_order的id进行关联，所以它的分片键选择为order_id。对应在代码中有专门的分片算法实现类：OmsOrderShardingAlgorithm和OmsOrderItemShardingAlgorithm，分别用于对订单和订单详情进行分片。</p><figure><img src="https://img.jssjqd.cn//202305031625531.png" alt="image-20230503162548555" tabindex="0" loading="lazy"><figcaption>image-20230503162548555</figcaption></figure><p>其中的OmsOrderShardingAlgorithm负责对订单进行分片，在实现上获得订单的Id或者member_id的后两位，然后对表的个数进行取模以定位到实际的物理oms_order表。OmsOrderItemShardingAlgorithm负责对订单详情进行分片，实现上与OmsOrderShardingAlgorithm类似。</p><h2 id="mysql应对海量数据" tabindex="-1"><a class="header-anchor" href="#mysql应对海量数据" aria-hidden="true">#</a> MySQL应对海量数据</h2><h3 id="归档历史数据" tabindex="-1"><a class="header-anchor" href="#归档历史数据" aria-hidden="true">#</a> 归档历史数据</h3><p>订单数据会随着时间一直累积的数据，前面我们说过预估订单的数量每个月订单2000W，一年的订单数可达2.4亿，三年可达7.2亿。</p><p>数据量越大，数据库就会越慢，这是为什么？我们需要理解造成这个问题的根本原因。无论是“增、删、改、查”中的哪个操作，其本质都是查找数据，因为我们需要先找到数据，然后才能操作数据。</p><p>无论采用的是哪种存储系统，一次查询所耗费的时间,都取决于如下两个因素。</p><p>1）查找的时间复杂度。2）数据总量。</p><p>查找的时间复杂度又取决于如下两个因素。</p><p>1）查找算法。</p><p>2）存储数据的数据结构。</p><p>这两个因素也是面试问题中经常考察的知识。 所以面试官并不是非要问一些“用不上”的问题来为难求职者，这些知识点不是用不上，而是求职者很多时候不知道怎么用。</p><p>大多数做业务的系统，采用的都是现成的数据库，数据的存储结构和查找算法都是由数据库来实现的，对此，业务系统基本上无法做出任何改变。我们知道MySQL 的 InnoDB存储引擎，其存储结构是B+树，查找算法大多数时候是对树进行查找，查找的时间复杂度就是O(log n)，这些都是固定的。我们唯一能改变的就是数据总量了。</p><p>所以，解决海量数据导致存储系统慢的问题，方法非常简单，就是一个“拆”字，把大数据拆分成若干份小数据，学名称为“分片”( Shard)。拆开之后,每个分片里的数据就没那么多了，然后让查找尽量落在某一个分片上,以此来提升查找性能。</p><h3 id="存档历史订单数据" tabindex="-1"><a class="header-anchor" href="#存档历史订单数据" aria-hidden="true">#</a> 存档历史订单数据</h3><p>订单数据一般保存在MySQL 的订单表里，说到拆分MySQL 的表，前面我们不是已经将到了“分库分表”吗？其实分库分表很多的时候并不是首选的方案，应该先考虑归档历史数据。</p><p>以京东为例</p><figure><img src="https://img.jssjqd.cn//202305031626434.png" alt="image-20230503162609664" tabindex="0" loading="lazy"><figcaption>image-20230503162609664</figcaption></figure><p>可以看到在“我的订单”中查询时，分为了近三个月订单、今年内订单、2021年订单、2020年订单等等，这就是典型的将订单数据归档处理。</p><p>所谓归档，也是一种拆分数据的策略。简单地说，就是把大量的历史订单移到另外一张历史订单表或数据存储中。为什这么做呢？订单数据有个特点：具备时间属性的，并且随着系统的运行，数据累计增长越来越多。但其实订单数据在使用上有个特点，最近的数据使用最频繁，超过一定时间的数据很少使用，这被称之为热尾效应。</p><p>因为新数据只占数据息量中很少的一部分，所以把新老数据分开之后，新数据的数据量就少很多，查询速度也会因此快很多。虽然与之前的总量相比，老数据没有减少太多，但是因为老数据很少会被访问到，所以即使慢一点儿也不会有太大的问题，而且还可以使用其他的存储系统提升查询速度。</p><p>这样拆分数据的另外一个好处是，拆分订单时，系统需要改动的代码非常少。对订单表的大部分操作都是在订单完成之前执行的，这些业务逻辑都是完全不用修改的。即使是像退货退款这类订单完成之后的操作，也是有时限的，这些业务逻辑也不需要修改,还是按照之前那样操作订单即可。</p><p>基本上只有查询统计类的功能会查到历史订单，这些都需要稍微做些调整。按照查询条件中的时间范围，选择去订单表还是历史订单中查询就可以了。很多大型互联网电商在逐步发展壮大的过程中，长达数年的时间采用的都是这种订单拆分的方案，正如我们前面看到的京东就是如此。</p><h3 id="商城历史订单服务的实现" tabindex="-1"><a class="header-anchor" href="#商城历史订单服务的实现" aria-hidden="true">#</a> 商城历史订单服务的实现</h3><p>商城历史订单的归档由tulingmall-order-history服务负责，其中比较关键的是三个Service</p><p>​ <img src="https://img.jssjqd.cn//202305031626128.png" alt="image-20230503162621731" loading="lazy"></p><p>既然是历史订单的归档，归档到哪里去呢？我们可以归档到另外的MySQL数据库，也可以归档到另外的存储系统，这个看自己的业务需求即可，在我们的系统中，我们选择归档到MongoDB数据库。</p><p>对于数据的迁移归档，我们总是在MySQL中保留3个月的订单数据，超过三个月的数据则迁出。前面我们说过，预估每月订单2000W，一张订单下的商品平均为10个，如果只保留3个月的数据，则订单详情数为6亿，分布到32个表中，每个表容纳的记录数刚好在2000W左右，这也是为什么前面的分库分表将订单表设定为32个的原因。</p><p>在我们的实现中，OperateDbServiceImpl负责读取MySQL的订单数据和删除已迁出的订单，OperateMgDbServiceImpl负责将订单数据批量插入MongoDB，MigrateCentreServiceImpl负责进行调度服务。</p><p>在进行数据迁移的过程需要注意以下两点：</p><h4 id="分布式事务" tabindex="-1"><a class="header-anchor" href="#分布式事务" aria-hidden="true">#</a> 分布式事务</h4><p>考察迁移的过程，我们是逐表批次删除，对于每张订单表，先从MySQL从获得指定批量的数据，写入MongoDB，再从MySQL中删除已写入MongoDB的部分，这里存在着一个多源的数据操作，为了保证数据的一致性，看起来似乎需要分布式事务。但是其实这里并不需要分布式事务，解决的关键在于写入订单数据到MongoDB时，我们要记住同时写入当前迁入数据的最大订单ID，让这两个操作执行在同一个事务之中。</p><p>​ <img src="https://img.jssjqd.cn//202305031627705.png" alt="image-20230503162705682" loading="lazy"></p><p>​ <img src="https://img.jssjqd.cn//202305031627173.png" alt="image-20230503162713265" loading="lazy"></p><p>这样，在MySQL执行数据迁移时，总是去MongoDB中获得上次处理的最大OrderId，作为本次迁移的查询起始ID</p><p>​ <img src="https://img.jssjqd.cn//202305031627668.png" alt="image-20230503162716745" loading="lazy"></p><p>当然数据写入MongoDB后，还要记得删除MySQL中对应的数据。</p><p>在这个过程中，我们需要注意的问题是，尽量不要影响线上的业务。迁移如此大量的数据，或多或少都会影响数据库的性能，因此应该尽量选择在闲时迁移而且每次数据库操作的记录数不宜太多。按照一般的经验，对MySQL的操作的记录条数每次控制在10000一下是比较合适，在我们的系统中缺省是2000条。更重要的是，迁移之前一定要做好备份，这样的话，即使不小心误操作了，也能用备份来恢复。</p><h3 id="如何批量删除大量数据" tabindex="-1"><a class="header-anchor" href="#如何批量删除大量数据" aria-hidden="true">#</a> 如何批量删除大量数据</h3><p>在迁移历史订单数据的过程中，还有一个很重要的细节间题:如何从订单表中删除已经迁走的历史订单数据？</p><p>虽然我们是按时间迁出订单表中的数据，但是删除最好还是按ID来删除，并且同样要控制住每次删除的记录条数，太大的数量容易遇到错误。</p><p>​ <img src="https://img.jssjqd.cn//202305031627849.png" alt="image-20230503162720722" loading="lazy"></p><p>这样每次删除的时候，由于条件变成了主键比较，而在MySQL的InnoDB存储引擎中，表数据结构就是按照主键组织的一棵B+树，同时B+树本身就是有序的，因此优化后不仅查找变得非常快,而且也不需要再进行额外的排序操作了。</p><p>为什么要加一个排序的操作呢？因为按ID排序后，每批删除的记录基本上都是ID连续的一批记录，由于B+树的有序性，这些ID相近的记录，在磁盘的物理文件上，大致也是存放在一起的，这样删除效率会比较高，也便于MySQL回收页。</p><p>关于大批量删除数据，还有一个点需要注意一下，执行删除语句后，最好能停顿一小会，因为删除后肯定会牵涉到大量的B+树页面分裂和合并，这个时候MySQL的本身的负载就不小了，停顿一小会，可以让MySQL的负载更加均衡。</p>`,189),i=[p];function n(s,o){return d(),r("div",null,i)}const l=t(e,[["render",n],["__file","index.html.vue"]]);export{l as default};