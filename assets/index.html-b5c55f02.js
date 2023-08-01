import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as r,c as l,a as e,b as i,e as d,f as t}from"./app-c8395efa.js";const v={},c=t(`<h3 id="适配器模式" tabindex="-1"><a class="header-anchor" href="#适配器模式" aria-hidden="true">#</a> 适配器模式</h3><p><strong>适配器模式 (Adapter Pattern)</strong>：将一个接口转换成客户希望的另一个接口，使接口不兼容的那些类可以一起工作，其别名为包装器 (Wrapper)。适配器模式既可以作为类结构型模式，也可以作为对象结构型模式。</p><p>在适配器模式中，我们通过增加一个新的适配器类来解决接口不兼容的问题，使得原本没有任何关系的类可以协同工作。</p><p>根据适配器类与适配者类的关系不同，适配器模式可分为对象适配器和类适配器两种，在<strong>对象适配器模式</strong>中，适配器与适配者之间是<strong>关联</strong>关系；在<strong>类适配器模式</strong>中，适配器与适配者之间是<strong>继承</strong>（或实现）关系。</p><h4 id="角色" tabindex="-1"><a class="header-anchor" href="#角色" aria-hidden="true">#</a> 角色</h4><p><strong>Target（目标抽象类）</strong>：目标抽象类定义客户所需接口，可以是一个抽象类或接口，也可以是具体类。</p><p><strong>Adapter（适配器类）</strong>：适配器可以调用另一个接口，作为一个转换器，对 Adaptee 和 Target 进行适配，适配器类是适配器模式的核心，在对象适配器中，它通过继承 Target 并关联一个 Adaptee 对象使二者产生联系。</p><p><strong>Adaptee（适配者类）</strong>：适配者即被适配的角色，它定义了一个已经存在的接口，这个接口需要适配，适配者类一般是一个具体类，包含了客户希望使用的业务方法，在某些情况下可能没有适配者类的源代码。</p><blockquote><p>缺省适配器模式 (Default Adapter Pattern)：当不需要实现一个接口所提供的所有方法时，可先设计一个抽象类实现该接口，并为接口中每个方法提供一个默认实现（空方法），那么该抽象类的子类可以选择性地覆盖父类的某些方法来实现需求，它适用于不想使用一个接口中的所有方法的情况，又称为单接口适配器模式。缺省适配器模式是适配器模式的一种变体，其应用也较为广泛。在 JDK 类库的事件处理包 java.awt.event 中广泛使用了缺省适配器模式，如 WindowAdapter、KeyAdapter、MouseAdapter 等。</p></blockquote><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><h4 id="类适配器" tabindex="-1"><a class="header-anchor" href="#类适配器" aria-hidden="true">#</a> 类适配器</h4><p>首先有一个已存在的将被适配的类</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Adaptee {
    public void adapteeRequest() {
        System.out.println(&quot;被适配者的方法&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义一个目标接口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface Target {
    void request();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>怎么才可以在目标接口中的 <code>request()</code> 调用 <code>Adaptee</code> 的 <code>adapteeRequest()</code> 方法呢？</p><p>如果直接实现 <code>Target</code> 是不行的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ConcreteTarget implements Target {
    @Override
    public void request() {
        System.out.println(&quot;concreteTarget目标方法&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果通过一个适配器类，实现 <code>Target</code> 接口，同时继承了 <code>Adaptee</code> 类，然后在实现的 <code>request()</code> 方法中调用父类的 <code>adapteeRequest()</code> 即可实现</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Adapter extends Adaptee implements Target{
    @Override
    public void request() {
        //...一些操作...
        super.adapteeRequest();
        //...一些操作...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们来测试一下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Test {
    public static void main(String[] args) {
        Target target = new ConcreteTarget();
        target.request();

        Target adapterTarget = new Adapter();
        adapterTarget.request();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>concreteTarget目标方法
被适配者的方法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://img.jssjqd.cn/aHR0cDovL2ltYWdlLmxhaWppYW5mZW5nLm9yZy9QYWNrYWdlJTIwY2xhc3NhZGFwdGVyLnBuZw" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这样我们即可在新接口 <code>Target</code> 中适配旧的接口或类</p><h4 id="对象适配器" tabindex="-1"><a class="header-anchor" href="#对象适配器" aria-hidden="true">#</a> 对象适配器</h4><p>对象适配器与类适配器不同之处在于，类适配器通过继承来完成适配，对象适配器则是通过关联来完成，这里稍微修改一下 <code>Adapter</code> 类即可将转变为对象适配器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Adapter implements Target{
    // 适配者是对象适配器的一个属性
    private Adaptee adaptee = new Adaptee();

    @Override
    public void request() {
        //...
        adaptee.adapteeRequest();
        //...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://img.jssjqd.cn/aHR0cDovL2ltYWdlLmxhaWppYW5mZW5nLm9yZy8yMDE4MDkxOVBhY2thZ2Vfb2JqZWN0YWRhcHRlci5wbmc" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>注意这里的 <code>Adapter</code> 是将 <code>Adaptee</code> 作为一个成员属性，而不是继承它</p><h4 id="电压适配器" tabindex="-1"><a class="header-anchor" href="#电压适配器" aria-hidden="true">#</a> 电压适配器</h4><p>再来一个好理解的例子，我们国家的民用电都是 220V，日本是 110V，而我们的手机充电一般需要 5V，这时候要充电，就需要一个电压适配器，将 220V 或者 100V 的输入电压变换为 5V 输出</p><p>定义输出交流电接口，输出 220V 交流电类和输出 110V 交流电类</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int outputAC();
}

public class AC110 implements AC {
    public final int output = 110;

    @Override
    public int outputAC() {
        return output;
    }
}

public class AC220 implements AC {
    public final int output = 220;

    @Override
    public int outputAC() {
        return output;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>适配器接口，其中 <code>support()</code> 方法用于检查输入的电压是否与适配器匹配，<code>outputDC5V()</code> 方法则用于将输入的电压变换为 5V 后输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface DC5Adapter {
    boolean support(AC ac);

    int outputDC5V(AC ac);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现中国变压适配器和日本变压适配器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ChinaPowerAdapter implements DC5Adapter {
    public static final int voltage = 220;
    
    @Override
    public boolean support(AC ac) {
        return (voltage == ac.outputAC());
    }
    
    @Override
    public int outputDC5V(AC ac) {
        int adapterInput = ac.outputAC();
        //变压器...
        int adapterOutput = adapterInput / 44;
        System.out.println(&quot;使用ChinaPowerAdapter变压适配器，输入AC:&quot; + adapterInput + &quot;V&quot; + &quot;，输出DC:&quot; + adapterOutput + &quot;V&quot;);
        return adapterOutput;
    }
}

public class JapanPowerAdapter implements DC5Adapter {
    public static final int voltage = 110;

    @Override
    public boolean support(AC ac) {
        return (voltage == ac.outputAC());
    }

    @Override
    public int outputDC5V(AC ac) {
        int adapterInput = ac.outputAC();
        //变压器...
        int adapterOutput = adapterInput / 22;
        System.out.println(&quot;使用JapanPowerAdapter变压适配器，输入AC:&quot; + adapterInput + &quot;V&quot; + &quot;，输出DC:&quot; + adapterOutput + &quot;V&quot;);
        return adapterOutput;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试，准备中国变压适配器和日本变压适配器各一个，定义一个方法可以根据电压找到合适的变压器，然后进行测试</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Test {
    private List&lt;DC5Adapter&gt; adapters = new LinkedList&lt;DC5Adapter&gt;();

    public Test() {
        this.adapters.add(new ChinaPowerAdapter());
        this.adapters.add(new JapanPowerAdapter());
    }

    // 根据电压找合适的变压器
    public DC5Adapter getPowerAdapter(AC ac) {
        DC5Adapter adapter = null;
        for (DC5Adapter ad : this.adapters) {
            if (ad.support(ac)) {
                adapter = ad;
                break;
            }
        }
        if (adapter == null){
            throw new  IllegalArgumentException(&quot;没有找到合适的变压适配器&quot;);
        }
        return adapter;
    }

    public static void main(String[] args) {
        Test test = new Test();
        AC chinaAC = new AC220();
        DC5Adapter adapter = test.getPowerAdapter(chinaAC);
        adapter.outputDC5V(chinaAC);

        // 去日本旅游，电压是 110V
        AC japanAC = new AC110();
        adapter = test.getPowerAdapter(japanAC);
        adapter.outputDC5V(japanAC);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>使用ChinaPowerAdapter变压适配器，输入AC:220V，输出DC:5V
使用JapanPowerAdapter变压适配器，输入AC:110V，输出DC:5V
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="适配器模式总结" tabindex="-1"><a class="header-anchor" href="#适配器模式总结" aria-hidden="true">#</a> 适配器模式总结</h3><p><strong>主要优点</strong>：</p><ol><li>将目标类和适配者类解耦，通过引入一个适配器类来重用现有的适配者类，无须修改原有结构。</li><li>增加了类的透明性和复用性，将具体的业务实现过程封装在适配者类中，对于客户端类而言是透明的，而且提高了适配者的复用性，同一个适配者类可以在多个不同的系统中复用。</li><li>灵活性和扩展性都非常好，通过使用配置文件，可以很方便地更换适配器，也可以在不修改原有代码的基础上增加新的适配器类，完全符合 “开闭原则”。</li></ol><p>具体来说，类适配器模式还有如下优点：</p><ul><li>由于适配器类是适配者类的子类，因此可以在适配器类中置换一些适配者的方法，使得适配器的灵活性更强。</li></ul><p>对象适配器模式还有如下优点：</p><ul><li>一个对象适配器可以把多个不同的适配者适配到同一个目标；</li><li>可以适配一个适配者的子类，由于适配器和适配者之间是关联关系，根据 “里氏代换原则”，适配者的子类也可通过该适配器进行适配。</li></ul><p>类适配器模式的缺点如下：</p><ol><li>对于 Java、C# 等不支持多重类继承的语言，一次最多只能适配一个适配者类，不能同时适配多个适配者；</li><li>适配者类不能为最终类，如在 Java 中不能为 final 类，C# 中不能为 sealed 类；</li><li>在 Java、C# 等语言中，类适配器模式中的目标抽象类只能为接口，不能为类，其使用有一定的局限性。</li></ol><p>对象适配器模式的缺点如下：</p><ul><li>与类适配器模式相比，要在适配器中置换适配者类的某些方法比较麻烦。如果一定要置换掉适配者类的一个或多个方法，可以先做一个适配者类的子类，将适配者类的方法置换掉，然后再把适配者类的子类当做真正的适配者进行适配，实现过程较为复杂。</li></ul><p><strong>适用场景</strong>：</p><ul><li>系统需要使用一些现有的类，而这些类的接口（如方法名）不符合系统的需要，甚至没有这些类的源代码。</li><li>想创建一个可以重复使用的类，用于与一些彼此之间没有太大关联的一些类，包括一些可能在将来引进的类一起工作。</li></ul><h3 id="源码分析适配器模式的典型应用" tabindex="-1"><a class="header-anchor" href="#源码分析适配器模式的典型应用" aria-hidden="true">#</a> 源码分析适配器模式的典型应用</h3><h4 id="spring-aop-中的适配器模式" tabindex="-1"><a class="header-anchor" href="#spring-aop-中的适配器模式" aria-hidden="true">#</a> spring AOP 中的适配器模式</h4><p>在 Spring 的 Aop 中，使用的 <code>Advice（通知）</code> 来增强被代理类的功能。</p><p><code>Advice</code>的类型有：<code>MethodBeforeAdvice</code>、<code>AfterReturningAdvice</code>、<code>ThrowsAdvice</code></p><p>在每个类型 <code>Advice</code> 都有对应的拦截器，<code>MethodBeforeAdviceInterceptor</code>、<code>AfterReturningAdviceInterceptor</code>、<code>ThrowsAdviceInterceptor</code></p><p>Spring 需要将每个 <code>Advice</code> <strong>都封装成对应的拦截器类型</strong>，返回给容器，所以需要使用适配器模式对 <code>Advice</code> 进行转换</p><p>三个适配者类 Adaptee 如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface MethodBeforeAdvice extends BeforeAdvice {
    void before(Method var1, Object[] var2, @Nullable Object var3) throws Throwable;
}

public interface AfterReturningAdvice extends AfterAdvice {
    void afterReturning(@Nullable Object var1, Method var2, Object[] var3, @Nullable Object var4) throws Throwable;
}

public interface ThrowsAdvice extends AfterAdvice {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目标接口 Target，有两个方法，一个判断 <code>Advice</code> 类型是否匹配，一个是工厂方法，创建对应类型的 <code>Advice</code> 对应的拦截器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface AdvisorAdapter {
    boolean supportsAdvice(Advice var1);

    MethodInterceptor getInterceptor(Advisor var1);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三个适配器类 Adapter 分别如下，注意其中的 Advice、Adapter、Interceptor 之间的对应关系</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class MethodBeforeAdviceAdapter implements AdvisorAdapter, Serializable {
	@Override
	public boolean supportsAdvice(Advice advice) {
		return (advice instanceof MethodBeforeAdvice);
	}

	@Override
	public MethodInterceptor getInterceptor(Advisor advisor) {
		MethodBeforeAdvice advice = (MethodBeforeAdvice) advisor.getAdvice();
		return new MethodBeforeAdviceInterceptor(advice);
	}
}

@SuppressWarnings(&quot;serial&quot;)
class AfterReturningAdviceAdapter implements AdvisorAdapter, Serializable {
	@Override
	public boolean supportsAdvice(Advice advice) {
		return (advice instanceof AfterReturningAdvice);
	}
	@Override
	public MethodInterceptor getInterceptor(Advisor advisor) {
		AfterReturningAdvice advice = (AfterReturningAdvice) advisor.getAdvice();
		return new AfterReturningAdviceInterceptor(advice);
	}
}

class ThrowsAdviceAdapter implements AdvisorAdapter, Serializable {
	@Override
	public boolean supportsAdvice(Advice advice) {
		return (advice instanceof ThrowsAdvice);
	}
	@Override
	public MethodInterceptor getInterceptor(Advisor advisor) {
		return new ThrowsAdviceInterceptor(advisor.getAdvice());
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端 DefaultAdvisorAdapterRegistry</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class DefaultAdvisorAdapterRegistry implements AdvisorAdapterRegistry, Serializable {
    private final List&lt;AdvisorAdapter&gt; adapters = new ArrayList(3);

    public DefaultAdvisorAdapterRegistry() {
        // 这里注册了适配器
        this.registerAdvisorAdapter(new MethodBeforeAdviceAdapter());
        this.registerAdvisorAdapter(new AfterReturningAdviceAdapter());
        this.registerAdvisorAdapter(new ThrowsAdviceAdapter());
    }
    
    public MethodInterceptor[] getInterceptors(Advisor advisor) throws UnknownAdviceTypeException {
        List&lt;MethodInterceptor&gt; interceptors = new ArrayList(3);
        Advice advice = advisor.getAdvice();
        if (advice instanceof MethodInterceptor) {
            interceptors.add((MethodInterceptor)advice);
        }

        Iterator var4 = this.adapters.iterator();

        while(var4.hasNext()) {
            AdvisorAdapter adapter = (AdvisorAdapter)var4.next();
            if (adapter.supportsAdvice(advice)) {   // 这里调用适配器方法
                interceptors.add(adapter.getInterceptor(advisor));  // 这里调用适配器方法
            }
        }

        if (interceptors.isEmpty()) {
            throw new UnknownAdviceTypeException(advisor.getAdvice());
        } else {
            return (MethodInterceptor[])interceptors.toArray(new MethodInterceptor[0]);
        }
    }
    // ...省略...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里看 while 循环里，逐个取出注册的适配器，调用 <code>supportsAdvice()</code> 方法来判断 <code>Advice</code> 对应的类型，然后调用 <code>getInterceptor()</code> 创建对应类型的拦截器</p><figure><img src="http://img.jssjqd.cn/aHR0cDovL2ltYWdlLmxhaWppYW5mZW5nLm9yZy8yMDE4MDkxOV8yMjE3LmpwZw" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里应该属于对象适配器模式，关键字 <code>instanceof</code> 可看成是 <code>Advice</code> 的方法，不过这里的 <code>Advice</code> 对象是从外部传进来，而不是成员属性</p><h4 id="spring-jpa-中的适配器模式" tabindex="-1"><a class="header-anchor" href="#spring-jpa-中的适配器模式" aria-hidden="true">#</a> spring JPA 中的适配器模式</h4><p>在 Spring 的 ORM 包中，对于 JPA 的支持也是采用了适配器模式，首先定义了一个接口的 <code>JpaVendorAdapter</code>，然后不同的持久层框架都实现此接口。</p><p>jpaVendorAdapter：用于设置实现厂商 JPA 实现的特定属性，如设置 Hibernate 的是否自动生成 DDL 的属性 generateDdl；这些属性是厂商特定的，因此最好在这里设置；目前 Spring 提供 <code>HibernateJpaVendorAdapter</code>、<code>OpenJpaVendorAdapter</code>、<code>EclipseLinkJpaVendorAdapter</code>、<code>TopLinkJpaVendorAdapter</code> 四个实现。其中最重要的属性是 database，用来指定使用的数据库类型，从而能<strong>根据数据库类型来决定比如如何将数据库特定异常转换为 Spring 的一致性异常</strong>，目前支持如下数据库（DB2、DERBY、H2、HSQL、INFORMIX、MYSQL、ORACLE、POSTGRESQL、SQL_SERVER、SYBASE）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface JpaVendorAdapter
{
  // 返回一个具体的持久层提供者
  public abstract PersistenceProvider getPersistenceProvider();

  // 返回持久层提供者的包名
  public abstract String getPersistenceProviderRootPackage();

  // 返回持久层提供者的属性
  public abstract Map&lt;String, ?&gt; getJpaPropertyMap();

  // 返回JpaDialect
  public abstract JpaDialect getJpaDialect();

  // 返回持久层管理器工厂
  public abstract Class&lt;? extends EntityManagerFactory&gt; getEntityManagerFactoryInterface();

  // 返回持久层管理器
  public abstract Class&lt;? extends EntityManager&gt; getEntityManagerInterface();

  // 自定义回调方法
  public abstract void postProcessEntityManagerFactory(EntityManagerFactory paramEntityManagerFactory);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们来看其中一个适配器实现类 HibernateJpaVendorAdapter</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class HibernateJpaVendorAdapter extends AbstractJpaVendorAdapter {
    //设定持久层提供者
    private final PersistenceProvider persistenceProvider;
    //设定持久层方言
    private final JpaDialect jpaDialect;

    public HibernateJpaVendorAdapter() {
        this.persistenceProvider = new HibernatePersistence();
        this.jpaDialect = new HibernateJpaDialect();
    }

    //返回持久层方言
    public PersistenceProvider getPersistenceProvider() {
        return this.persistenceProvider;
    }

    //返回持久层提供者
    public String getPersistenceProviderRootPackage() {
        return &quot;org.hibernate&quot;;
    }

    //返回JPA的属性
    public Map&lt;String, Object&gt; getJpaPropertyMap() {
        Map jpaProperties = new HashMap();

        if (getDatabasePlatform() != null) {
            jpaProperties.put(&quot;hibernate.dialect&quot;, getDatabasePlatform());
        } else if (getDatabase() != null) {
            Class databaseDialectClass = determineDatabaseDialectClass(getDatabase());
            if (databaseDialectClass != null) {
                jpaProperties.put(&quot;hibernate.dialect&quot;,
                        databaseDialectClass.getName());
            }
        }

        if (isGenerateDdl()) {
            jpaProperties.put(&quot;hibernate.hbm2ddl.auto&quot;, &quot;update&quot;);
        }
        if (isShowSql()) {
            jpaProperties.put(&quot;hibernate.show_sql&quot;, &quot;true&quot;);
        }

        return jpaProperties;
    }

    //设定数据库
    protected Class determineDatabaseDialectClass(Database database)     
    {                                                                                       
        switch (1.$SwitchMap$org$springframework$orm$jpa$vendor$Database[database.ordinal()]) 
        {                                                                                     
        case 1:                                                                             
          return DB2Dialect.class;                                                            
        case 2:                                                                               
          return DerbyDialect.class;                                                          
        case 3:                                                                               
          return H2Dialect.class;                                                             
        case 4:                                                                               
          return HSQLDialect.class;                                                           
        case 5:                                                                               
          return InformixDialect.class;                                                       
        case 6:                                                                               
          return MySQLDialect.class;                                                          
        case 7:                                                                               
          return Oracle9iDialect.class;                                                       
        case 8:                                                                               
          return PostgreSQLDialect.class;                                                     
        case 9:                                                                               
          return SQLServerDialect.class;                                                      
        case 10:                                                                              
          return SybaseDialect.class; }                                                       
        return null;              
    }

    //返回JPA方言
    public JpaDialect getJpaDialect() {
        return this.jpaDialect;
    }

    //返回JPA实体管理器工厂
    public Class&lt;? extends EntityManagerFactory&gt; getEntityManagerFactoryInterface() {
        return HibernateEntityManagerFactory.class;
    }

    //返回JPA实体管理器
    public Class&lt;? extends EntityManager&gt; getEntityManagerInterface() {
        return HibernateEntityManager.class;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件中可以这样指定</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;bean id=&quot;jpaVendorAdapter&quot; class=&quot;org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter&quot;&gt; 
   &lt;property  /&gt;  
   &lt;property /&gt;  
&lt;/bean&gt;  
&lt;bean id=&quot;jpaDialect&quot; class=&quot;org.springframework.orm.jpa.vendor.HibernateJpaDialect&quot;/&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="spring-mvc-中的适配器模式" tabindex="-1"><a class="header-anchor" href="#spring-mvc-中的适配器模式" aria-hidden="true">#</a> spring MVC 中的适配器模式</h4><p>Spring MVC 中的适配器模式主要用于执行目标 <code>Controller</code> 中的请求处理方法。</p><p>在 Spring MVC 中，<code>DispatcherServlet</code> 作为用户，<code>HandlerAdapter</code> 作为期望接口，具体的适配器实现类用于对目标类进行适配，<code>Controller</code> 作为需要适配的类。</p><p>为什么要在 Spring MVC 中使用适配器模式？Spring MVC 中的 <code>Controller</code> 种类众多，不同类型的 <code>Controller</code> 通过不同的方法来对请求进行处理。如果不利用适配器模式的话，<code>DispatcherServlet</code> 直接获取对应类型的 <code>Controller</code>，需要的自行来判断，像下面这段代码一样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if(mappedHandler.getHandler() instanceof MultiActionController){  
   ((MultiActionController)mappedHandler.getHandler()).xxx  
}else if(mappedHandler.getHandler() instanceof XXX){  
    ...  
}else if(...){  
   ...  
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样假设如果我们增加一个 <code>HardController</code>, 就要在代码中加入一行 <code>if(mappedHandler.getHandler() instanceof HardController)</code>，这种形式就使得程序难以维护，也违反了设计模式中的开闭原则 – 对扩展开放，对修改关闭。</p><p>我们来看看源码，首先是适配器接口 <code>HandlerAdapter</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface HandlerAdapter {
    boolean supports(Object var1);

    ModelAndView handle(HttpServletRequest var1, HttpServletResponse var2, Object var3) throws Exception;

    long getLastModified(HttpServletRequest var1, Object var2);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现该接口的适配器每一个 <code>Controller</code> 都有一个适配器与之对应，这样的话，每自定义一个 <code>Controller</code> 需要定义一个实现 <code>HandlerAdapter</code> 的适配器。</p><p>springmvc 中提供的 <code>Controller</code> 实现类有如下</p><figure><img src="http://img.jssjqd.cn/aHR0cDovL2ltYWdlLmxhaWppYW5mZW5nLm9yZy8yMDE4MDkxOV8yMzMzMjcucG5n" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>springmvc 中提供的 <code>HandlerAdapter</code> 实现类如下</p><figure><img src="http://img.jssjqd.cn/aHR0cDovL2ltYWdlLmxhaWppYW5mZW5nLm9yZy8yMDE4MDkxOV8yMzQzMjUucG5n" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><code>HttpRequestHandlerAdapter</code> 这个适配器代码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class HttpRequestHandlerAdapter implements HandlerAdapter {
    public HttpRequestHandlerAdapter() {
    }

    public boolean supports(Object handler) {
        return handler instanceof HttpRequestHandler;
    }

    public ModelAndView handle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        ((HttpRequestHandler)handler).handleRequest(request, response);
        return null;
    }

    public long getLastModified(HttpServletRequest request, Object handler) {
        return handler instanceof LastModified ? ((LastModified)handler).getLastModified(request) : -1L;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 Spring 容器启动后，会将所有定义好的适配器对象存放在一个 List 集合中，当一个请求来临时，<code>DispatcherServlet</code> 会通过 <code>handler</code> 的类型找到对应适配器，并将该适配器对象返回给用户，然后就可以统一通过适配器的 <code>hanle()</code> 方法来调用 <code>Controller</code> 中的用于处理请求的方法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class DispatcherServlet extends FrameworkServlet {
    private List&lt;HandlerAdapter&gt; handlerAdapters;
    
    //初始化handlerAdapters
    private void initHandlerAdapters(ApplicationContext context) {
        //..省略...
    }
    
    // 遍历所有的 HandlerAdapters，通过 supports 判断找到匹配的适配器
    protected HandlerAdapter getHandlerAdapter(Object handler) throws ServletException {
		for (HandlerAdapter ha : this.handlerAdapters) {
			if (logger.isTraceEnabled()) {
				logger.trace(&quot;Testing handler adapter [&quot; + ha + &quot;]&quot;);
			}
			if (ha.supports(handler)) {
				return ha;
			}
		}
	}
	
	// 分发请求，请求需要找到匹配的适配器来处理
	protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpServletRequest processedRequest = request;
		HandlerExecutionChain mappedHandler = null;

		// Determine handler for the current request.
		mappedHandler = getHandler(processedRequest);
			
		// 确定当前请求的匹配的适配器.
		HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());

		ha.getLastModified(request, mappedHandler.getHandler());
					
		mv = ha.handle(processedRequest, response, mappedHandler.getHandler());
    }
	// ...省略...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过适配器模式我们将所有的 <code>controller</code> 统一交给 <code>HandlerAdapter</code> 处理，免去了写大量的 <code>if-else</code> 语句对 <code>Controller</code> 进行判断，也更利于扩展新的 <code>Controller</code> 类型。</p>`,99),u=e("br",null,null,-1),o=e("br",null,null,-1),p=e("br",null,null,-1),b={href:"https://blog.csdn.net/lu__peng/article/details/79117894",target:"_blank",rel:"noopener noreferrer"},m=e("br",null,null,-1),g={href:"https://blog.csdn.net/liuquan0071/article/details/50506121",target:"_blank",rel:"noopener noreferrer"};function A(h,x){const n=s("ExternalLinkIcon");return r(),l("div",null,[c,e("blockquote",null,[e("p",null,[i("参考："),u,i(" 刘伟：设计模式 Java 版"),o,i(" 慕课网 java 设计模式精讲 Debug 方式 + 内存分析"),p,i(" 孤落:"),e("a",b,[i("Spring MVC 中的适配器模式"),d(n)]),m,i(" ToughMind_："),e("a",g,[i("深入浅出设计模式（五）：7. 适配器模式"),d(n)])])])])}const C=a(v,[["render",A],["__file","index.html.vue"]]);export{C as default};
