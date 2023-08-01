import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,f as t}from"./app-21ce620e.js";const n={},c=t('<h3 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h3><p>单例模式，顾名思义就是只有一个实例，并且她自己负责创建自己的对象，这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。下面我们来看下有哪几种实现方式吧。</p><p>核心代码：构造方法私有化，private。</p><h4 id="_1、懒汉式" tabindex="-1"><a class="header-anchor" href="#_1、懒汉式" aria-hidden="true">#</a> 1、懒汉式</h4><figure><img src="http://img.jssjqd.cn/b90e7bec54e736d1a0c9c7a226bdf8c6d76269b0.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>懒汉式，顾名思义就是实例在用到的时候才去创建，“比较懒”，用的时候才去检查有没有实例，如果有则返回，没有则新建。有线程安全和线程不安全两种写法，区别就是 synchronized 关键字。</p><h4 id="_2、饿汉式" tabindex="-1"><a class="header-anchor" href="#_2、饿汉式" aria-hidden="true">#</a> 2、饿汉式</h4><figure><img src="http://img.jssjqd.cn/3801213fb80e7becd4cbbd5a92c30e3c9a506b6e.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>饿汉式，从名字上也很好理解，就是 “比较勤”，实例在初始化的时候就已经建好了，不管你有没有用到，都先建好了再说。好处是没有线程安全的问题，坏处是浪费内存空间。</p><h4 id="_3、双检锁" tabindex="-1"><a class="header-anchor" href="#_3、双检锁" aria-hidden="true">#</a> 3、双检锁</h4><figure><img src="http://img.jssjqd.cn/f2deb48f8c5494ee903cfa53901857fa98257e54.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>双检锁，又叫双重校验锁，综合了懒汉式和饿汉式两者的优缺点整合而成。看上面代码实现中，特点是在 synchronized 关键字内外都加了一层 if 条件判断，这样既保证了线程安全，又比直接上锁提高了执行效率，还节省了内存空间。</p><h4 id="_4、静态内部类" tabindex="-1"><a class="header-anchor" href="#_4、静态内部类" aria-hidden="true">#</a> 4、静态内部类</h4><figure><img src="http://img.jssjqd.cn/20190623135218977.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>静态内部类的方式效果类似双检锁，但实现更简单。但这种方式只适用于静态域的情况，双检锁方式可在实例域需要延迟初始化时使用。</p><p>静态内部类的优点是：外部类加载时并不需要立即加载内部类，内部类不被加载则不去初始化INSTANCE，故而不占内存。即当SingleTon第一次被加载时，并不需要去加载SingleTonHoler，只有当getInstance()方法第一次被调用时，才会去初始化INSTANCE,第一次调用getInstance()方法会导致虚拟机加载SingleTonHoler类，这种方法不仅能确保线程安全，也能保证单例的唯一性，同时也延迟了单例的实例化。</p><p>那么，静态内部类又是如何实现线程安全的呢？首先，我们先了解下类的加载时机。</p><p>类加载时机：JAVA虚拟机在有且仅有的5种场景下会对类进行初始化。 1.遇到new、getstatic、setstatic或者invokestatic这4个字节码指令时，对应的java代码场景为：new一个关键字或者一个实例化对象时、读取或设置一个静态字段时(final修饰、已在编译期把结果放入常量池的除外)、调用一个类的静态方法时。 2.使用java.lang.reflect包的方法对类进行反射调用的时候，如果类没进行初始化，需要先调用其初始化方法进行初始化。 3.当初始化一个类时，如果其父类还未进行初始化，会先触发其父类的初始化。 4.当虚拟机启动时，用户需要指定一个要执行的主类(包含main()方法的类)，虚拟机会先初始化这个类。 5.当使用JDK 1.7等动态语言支持时，如果一个java.lang.invoke.MethodHandle实例最后的解析结果REF_getStatic、REF_putStatic、REF_invokeStatic的方法句柄，并且这个方法句柄所对应的类没有进行过初始化，则需要先触发其初始化。 这5种情况被称为是类的主动引用，注意，这里《虚拟机规范》中使用的限定词是&quot;有且仅有&quot;，那么，除此之外的所有引用类都不会对类进行初始化，称为被动引用。静态内部类就属于被动引用的行列。</p><p>我们再回头看下getInstance()方法，调用的是SingleTonHoler.INSTANCE，取的是SingleTonHoler里的INSTANCE对象，跟上面那个DCL方法不同的是，getInstance()方法并没有多次去new对象，故不管多少个线程去调用getInstance()方法，取的都是同一个INSTANCE对象，而不用去重新创建。当getInstance()方法被调用时，SingleTonHoler才在SingleTon的运行时常量池里，把符号引用替换为直接引用，这时静态对象INSTANCE也真正被创建，然后再被getInstance()方法返回出去，这点同饿汉模式。那么INSTANCE在创建过程中又是如何保证线程安全的呢？在《深入理解JAVA虚拟机》中，有这么一句话:</p><p>虚拟机会保证一个类的&lt;clinit&gt;()方法在多线程环境中被正确地加锁、同步，如果多个线程同时去初始化一个类，那么只会有一个线程去执行这个类的&lt;clinit&gt;()方法，其他线程都需要阻塞等待，直到活动线程执行&lt;clinit&gt;()方法完毕。如果在一个类的&lt;clinit&gt;()方法中有耗时很长的操作，就可能造成多个进程阻塞(需要注意的是，其他线程虽然会被阻塞，但如果执行&lt;clinit&gt;()方法后，其他线程唤醒之后不会再次进入&lt;clinit&gt;()方法。同一个加载器下，一个类型只会初始化一次。)，在实际应用中，这种阻塞往往是很隐蔽的。</p><p>故而，可以看出INSTANCE在创建过程中是线程安全的，所以说静态内部类形式的单例可保证线程安全，也能保证单例的唯一性，同时也延迟了单例的实例化。</p><p>那么，是不是可以说静态内部类单例就是最完美的单例模式了呢？其实不然，静态内部类也有着一个致命的缺点，就是传参的问题，由于是静态内部类的形式去创建单例的，故外部无法传递参数进去，例如Context这种参数，所以，我们创建单例时，可以在静态内部类与DCL模式里自己斟酌。</p><h4 id="_5、枚举" tabindex="-1"><a class="header-anchor" href="#_5、枚举" aria-hidden="true">#</a> 5、枚举</h4><figure><img src="http://img.jssjqd.cn/20190623135234518.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>枚举的方式是比较少见的一种实现方式，但是看上面的代码实现，却更简洁清晰。并且她还自动支持序列化机制，绝对防止多次实例化。</p><p>好了，上面就是单例模式的五种主要写法。我们来总结下，一般情况下，懒汉式（包含线程安全和线程不安全梁总方式）都比较少用；饿汉式和双检锁都可以使用，可根据具体情况自主选择；在要明确实现 lazy loading 效果时，可以考虑静态内部类的实现方式；若涉及到反序列化创建对象时，大家也可以尝试使用枚举方式。</p>',26),r=[c];function d(g,l){return a(),i("div",null,r)}const s=e(n,[["render",d],["__file","index.html.vue"]]);export{s as default};
