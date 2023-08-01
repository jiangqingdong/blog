import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,f as a}from"./app-21ce620e.js";const t={},r=a(`<h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3><p>本文的主要内容：</p><ul><li><p>介绍装饰者模式</p></li><li><p>示例</p></li><li><p>源码分析装饰者模式的典型应用</p></li><li><p>Java I/O 中的装饰者模式</p></li><li><p>spring session 中的装饰者模式</p></li><li><p>Mybatis 缓存中的装饰者模式</p></li><li><p>总结</p></li></ul><h3 id="装饰者模式" tabindex="-1"><a class="header-anchor" href="#装饰者模式" aria-hidden="true">#</a> 装饰者模式</h3><p><strong>装饰者模式 (Decorator Pattern)</strong>：动态地给一个对象增加一些额外的职责，增加对象功能来说，装饰模式比生成子类实现更为灵活。装饰模式是一种对象结构型模式。</p><p>在装饰者模式中，为了让系统具有更好的灵活性和可扩展性，我们通常会定义一个抽象装饰类，而将具体的装饰类作为它的子类</p><h4 id="角色" tabindex="-1"><a class="header-anchor" href="#角色" aria-hidden="true">#</a> 角色</h4><p><strong>Component（抽象构件）</strong>：它是具体构件和抽象装饰类的共同父类，声明了在具体构件中实现的业务方法，它的引入可以使客户端以一致的方式处理未被装饰的对象以及装饰之后的对象，实现客户端的透明操作。</p><p><strong>ConcreteComponent（具体构件）</strong>：它是抽象构件类的子类，用于定义具体的构件对象，实现了在抽象构件中声明的方法，装饰器可以给它增加额外的职责（方法）。</p><p><strong>Decorator（抽象装饰类）</strong>：它也是抽象构件类的子类，用于给具体构件增加职责，但是具体职责在其子类中实现。它维护一个指向抽象构件对象的引用，通过该引用可以调用装饰之前构件对象的方法，并通过其子类扩展该方法，以达到装饰的目的。</p><p><strong>ConcreteDecorator（具体装饰类）</strong>：它是抽象装饰类的子类，负责向构件添加新的职责。每一个具体装饰类都定义了一些新的行为，它可以调用在抽象装饰类中定义的方法，并可以增加新的方法用以扩充对象的行为。</p><p>由于具体构件类和装饰类都实现了相同的抽象构件接口，因此装饰模式以对客户透明的方式动态地给一个对象附加上更多的责任，换言之，客户端并不会觉得对象在装饰前和装饰后有什么不同。装饰模式可以在不需要创造更多子类的情况下，将对象的功能加以扩展。</p><p>装饰模式的<strong>核心在于抽象装饰类的设计</strong>。</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><p>煎饼抽象类</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public abstract class ABattercake {    
	protected abstract String getDesc();   
	protected abstract int cost();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>煎饼类，继承了煎饼抽象类，一个煎饼 8 块钱</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Battercake extends ABattercake {    

 	@Override    
 	protected String getDesc() {        
 	return &quot;煎饼&quot;;    
 	}    
 	@Override    
 	protected int cost() {       
    return 8;    
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>抽象装饰类，需要注意的是，<strong>抽象装饰类通过成员属性的方式将 煎饼抽象类组合进来，同时也继承了煎饼抽象类</strong>，且这里定义了新的业务方法 <code>doSomething()</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public abstract class AbstractDecorator extends ABattercake {    

    private ABattercake aBattercake;   
    public AbstractDecorator(ABattercake aBattercake) {        
        this.aBattercake = aBattercake;    
    }    
    protected abstract void doSomething();    
    @Override    
    protected String getDesc() {        
        return this.aBattercake.getDesc();   
         }    
    @Override   
    protected int cost() {        
        return this.aBattercake.cost();    
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>鸡蛋装饰器，继承了抽象装饰类，鸡蛋装饰器在父类的基础上增加了一个鸡蛋，同时价格加上 1 块钱</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class EggDecorator extends AbstractDecorator { 

    public EggDecorator(ABattercake aBattercake) {       
   		super(aBattercake);   
    }  
    
    @Override   
    protected void doSomething() {    
    } 
    
    @Override    
    protected String getDesc() {        
    	return super.getDesc() + &quot; 加一个鸡蛋&quot;;    
    }   
    
    @Override    
    protected int cost() {        
    return super.cost() + 1;   
    }    
    public void egg() {       
    System.out.println(&quot;增加了一个鸡蛋&quot;);    
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>香肠装饰器，与鸡蛋装饰器类似，继承了抽象装饰类，给在父类的基础上加上一根香肠，同时价格增加 2 块钱</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class SausageDecorator extends AbstractDecorator{    

    public SausageDecorator(ABattercake aBattercake) {        
        super(aBattercake);   
    }   
    
    @Override   
        protected void doSomething() {    
    }   
    
    @Override   
    protected String getDesc() {        
        return super.getDesc() + &quot; 加一根香肠&quot;;    
    }  
    
    @Override    
    protected int cost() {        
        return super.cost() + 2;    
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="测试-购买煎饼" tabindex="-1"><a class="header-anchor" href="#测试-购买煎饼" aria-hidden="true">#</a> 测试，购买煎饼</h4><p><strong>1、购买一个煎饼</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Test {    
	public static void main(String[] args) {       
	ABattercake aBattercake = new Battercake();        
	System.out.println(aBattercake.getDesc() + &quot;, 销售价格: &quot; + aBattercake.cost());    
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>煎饼, 销售价格: 8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2、购买一个加鸡蛋的煎饼</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Test {    
	public static void main(String[] args) {        
	ABattercake aBattercake = new Battercake();        
	aBattercake = new EggDecorator(aBattercake);        
	System.out.println(aBattercake.getDesc() + &quot;, 销售价格: &quot; + aBattercake.cost());    
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>煎饼 加一个鸡蛋, 销售价格: 9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>3、购买一个加两个鸡蛋的煎饼</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Test {    
    public static void main(String[] args) {       
        ABattercake aBattercake = new Battercake();       
        aBattercake = new EggDecorator(aBattercake);        
        aBattercake = new EggDecorator(aBattercake);        
        System.out.println(aBattercake.getDesc() + &quot;, 销售价格: &quot; + aBattercake.cost());   
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>煎饼 加一个鸡蛋 加一个鸡蛋, 销售价格: 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>4、购买一个加两个鸡蛋和一根香肠的煎饼</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Test {    
    public static void main(String[] args) {        
        ABattercake aBattercake = new Battercake();        
        aBattercake = new EggDecorator(aBattercake);        
        aBattercake = new EggDecorator(aBattercake);        
        aBattercake = new SausageDecorator(aBattercake);        
        System.out.println(aBattercake.getDesc() + &quot;, 销售价格: &quot; + aBattercake.cost());    
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>煎饼 加一个鸡蛋 加一个鸡蛋 加一根香肠, 销售价格: 12
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>画出 UML 类图如下所示</p><figure><img src="http://img.jssjqd.cn/20200708175926.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>装饰者模式类图</p><h4 id="小结一下" tabindex="-1"><a class="header-anchor" href="#小结一下" aria-hidden="true">#</a> 小结一下</h4><p>由于具体构件类和装饰类都实现了相同的抽象构件接口，因此装饰模式以对客户透明的方式动态地给一个对象附加上更多的责任，换言之，客户端并不会觉得对象在装饰前和装饰后有什么不同。</p><p>譬如我们给煎饼加上一个鸡蛋可以这么写 <code>aBattercake = new EggDecorator(aBattercake);</code>，客户端仍然可以把 <code>aBattercake</code> 当成原来的 <code>aBattercake</code>一样，不过现在的 <code>aBattercake</code>已经被装饰加上了鸡蛋</p><p>装饰模式可以在不需要创造更多子类的情况下，将对象的功能加以扩展。</p><h4 id="透明装饰模式与半透明装饰模式" tabindex="-1"><a class="header-anchor" href="#透明装饰模式与半透明装饰模式" aria-hidden="true">#</a> 透明装饰模式与半透明装饰模式</h4><p>在上面的示例中，装饰后的对象是通过抽象构建类类型 <code>ABattercake</code> 的变量来引用的，在鸡蛋装饰器这个类中我们新增了 <code>egg()</code> 方法，如果此时我们想要<strong>单独调用该方法</strong>是调用不到的</p><p>除非引用变量的类型改为 <code>EggDecorator</code>，这样就可以调用了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>EggDecorator eggBattercake = new EggDecorator(aBattercake); eggBattercake.egg();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在实际使用过程中，由于新增行为可能需要单独调用，因此这种形式的装饰模式也经常出现，这种装饰模式被称为<strong>半透明 (Semi-transparent) 装饰模式</strong>，而标准的装饰模式是<strong>透明 (Transparent) 装饰模式</strong>。</p><p><strong>(1) 透明装饰模式</strong></p><p>在透明装饰模式中，要求客户端完全针对抽象编程，装饰模式的透明性要求客户端程序不应该将对象声明为具体构件类型或具体装饰类型，而应该全部声明为抽象构件类型。</p><p><strong>(2) 半透明装饰模式</strong></p><p>透明装饰模式的设计难度较大，而且有时我们需要单独调用新增的业务方法。为了能够调用到新增方法，我们不得不用具体装饰类型来定义装饰之后的对象，而具体构件类型还是可以使用抽象构件类型来定义，这种装饰模式即为半透明装饰模式。</p><p>半透明装饰模式可以给系统带来更多的灵活性，设计相对简单，使用起来也非常方便；但是其最大的缺点在于<strong>不能实现对同一个对象的多次装饰</strong>，而且客户端需要有区别地对待装饰之前的对象和装饰之后的对象。</p><h4 id="装饰模式注意事项" tabindex="-1"><a class="header-anchor" href="#装饰模式注意事项" aria-hidden="true">#</a> 装饰模式注意事项</h4><p>(1) 尽量保持装饰类的接口与被装饰类的接口相同，这样，对于客户端而言，无论是装饰之前的对象还是装饰之后的对象都可以一致对待。这也就是说，在可能的情况下，我们应该尽量使用透明装饰模式。</p><p>(2) 尽量保持具体构件类是一个 “轻” 类，也就是说不要把太多的行为放在具体构件类中，我们可以通过装饰类对其进行扩展。</p><p>(3) 如果只有一个具体构件类，那么抽象装饰类可以作为该具体构件类的直接子类。</p><h3 id="源码分析装饰者模式的典型应用" tabindex="-1"><a class="header-anchor" href="#源码分析装饰者模式的典型应用" aria-hidden="true">#</a> 源码分析装饰者模式的典型应用</h3><h4 id="java-i-o-中的装饰者模式" tabindex="-1"><a class="header-anchor" href="#java-i-o-中的装饰者模式" aria-hidden="true">#</a> Java I/O 中的装饰者模式</h4><p>使用 Java I/O 的时候总是有各种输入流、输出流、字符流、字节流、过滤流、缓冲流等等各种各样的流，不熟悉里边的设计模式的话总会看得云里雾里的，现在通过设计模式的角度来看 Java I/O，会好理解很多。</p><p>先用一幅图来看看 Java I/O 到底是什么，下面的这幅图生动的刻画了 Java I/O 的作用。</p><p><img src="http://img.jssjqd.cn/20200708180017.png" alt="" loading="lazy">Java I/O 的作用图</p><p>由上图可知在 Java 中应用程序通过输入流（InputStream）的 Read 方法从源地址处读取字节，然后通过输出流（OutputStream）的 Write 方法将流写入到目的地址。</p><p>流的来源主要有三种：本地的文件（File）、控制台、通过 socket 实现的网络通信</p><p>下面的图可以看出 Java 中的装饰者类和被装饰者类以及它们之间的关系，这里只列出了 InputStream 中的关系：</p><p><img src="http://img.jssjqd.cn/20200708180119.png" alt="" loading="lazy">InputStream 部分类关系</p><p>由上图可以看出只要继承了 FilterInputStream 的类就是装饰者类，可以用于包装其他的流，装饰者类还可以对装饰者和类进行再包装。</p><p><strong>这里总结几种常用流的应用场景</strong>：</p><table><thead><tr><th>流名称</th><th>应用场景</th></tr></thead><tbody><tr><td>ByteArrayInputStream</td><td>访问数组，把内存中的一个缓冲区作为 InputStream 使用，CPU 从缓存区读取数据比从存储介质的速率快 10 倍以上</td></tr><tr><td>StringBufferInputStream</td><td>把一个 String 对象作为。InputStream。不建议使用，在转换字符的问题上有缺陷</td></tr><tr><td>FileInputStream</td><td>访问文件，把一个文件作为 InputStream ，实现对文件的读取操作</td></tr><tr><td>PipedInputStream</td><td>访问管道，主要在线程中使用，一个线程通过管道输出流发送数据，而另一个线程通过管道输入流读取数据，这样可实现两个线程间的通讯</td></tr><tr><td>SequenceInputStream</td><td>把多个 InputStream 合并为一个 InputStream . “序列输入流” 类允许应用程序把几个输入流连续地合并起来</td></tr><tr><td>DataInputStream</td><td>特殊流，读各种基本类型数据, 如 byte、int、String 的功能</td></tr><tr><td>ObjectInputStream</td><td>对象流，读对象的功能</td></tr><tr><td>PushBackInputStream</td><td>推回输入流，可以把读取进来的某些数据重新回退到输入流的缓冲区之中</td></tr><tr><td>BufferedInputStream</td><td>缓冲流，增加了缓冲功能</td></tr></tbody></table><p><strong>下面看一下 Java 中包装流的实例</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class StreamDemo {    
    public static void main(String[] args) throws IOException{        
        DataInputStream in=new DataInputStream(new BufferedInputStream(new  FileInputStream(&quot;D:\\\\hello.txt&quot;)));       
        while(in.available()!=0) {           
        System.out.print((char)in.readByte());        
        }        
        in.close();    
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hello world!hello Java I/O!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面程序中对流进行了两次包装，先用 BufferedInputStream 将 FileInputStream 包装成缓冲流也就是给 FileInputStream 增加缓冲功能，再 DataInputStream 进一步包装方便数据处理。</p><p>如果要<strong>实现一个自己的包装流</strong>，根据上面的类图，需要继承抽象装饰类 FilterInputStream</p><p>譬如来实现这样一个操作的装饰者类：将输入流中的所有小写字母变成大写字母</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import java.io.FileInputStream;
import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;
public class UpperCaseInputStream extends FilterInputStream {    

    protected UpperCaseInputStream(InputStream in) {        
    	super(in);   
    }    

    @Override    
    public int read() throws IOException {        
        int c = super.read();       
        return (c == -1 ? c : Character.toUpperCase(c));    
    }    
    @Override    
    public int read(byte[] b, int off, int len) throws IOException {        
        int result = super.read(b, off, len);        
        for (int i = off; i &lt; off + result; i++) {           
        b[i] = (byte) Character.toUpperCase((char) b[i]);        
    }       
    	return result;    
    }    
    public static void main(String[] args) throws IOException {        
        int c;        
        InputStream in = new UpperCaseInputStream(new FileInputStream(&quot;D:\\\\hello.txt&quot;));        
        try {            
        while ((c = in.read()) &gt;= 0) {                
        System.out.print((char) c);           
        }        } 
        finally {            
        in.close();        
    	}    
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>HELLO WORLD!HELLO JAVA I/O!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>整个 Java IO 体系都是基于字符流 (InputStream/OutputStream) 和 字节流(Reader/Writer) 作为基类，下面画出 OutputStream、Reader、Writer 的部分类图，更多细节请查看其它资料</p><p><img src="http://img.jssjqd.cn/20200708180210.png" alt="" loading="lazy">OutputStream 类图<img src="http://img.jssjqd.cn/20200708180309.png" alt="" loading="lazy"></p><p>Reader 类图<img src="http://img.jssjqd.cn/20200708180336.png" alt="" loading="lazy"> Writer 类图</p><h4 id="spring-cache-中的装饰者模式" tabindex="-1"><a class="header-anchor" href="#spring-cache-中的装饰者模式" aria-hidden="true">#</a> spring cache 中的装饰者模式</h4><p>看 <code>org.springframework.cache.transaction</code> 包下的 <code>TransactionAwareCacheDecorator</code> 这个类</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class TransactionAwareCacheDecorator implements Cache {    

    private final Cache targetCache;  
    
    public TransactionAwareCacheDecorator(Cache targetCache) { 
    
        Assert.notNull(targetCache, &quot;Target Cache must not be null&quot;);        
        this.targetCache = targetCache;  
        
    }    
    public &lt;T&gt; T get(Object key, Class&lt;T&gt; type) {        
    	
    	return this.targetCache.get(key, type);  
        
    }    
    
    public void put(final Object key, final Object value) { 
    
    // 判断是否开启了事务        
    if (TransactionSynchronizationManager.isSynchronizationActive()) {           
    // 将操作注册到 afterCommit 阶段            
    TransactionSynchronizationManager.registerSynchronization(
        new TransactionSynchronizationAdapter() {                
        public void afterCommit() {                    
        TransactionAwareCacheDecorator.this.targetCache.put(key, value);               
        }            
    });
    } else {            
        this.targetCache.put(key, value);        
    }    
    }    
    // ...省略...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该类实现了 <code>Cache</code> 接口，同时将 <code>Cache</code> 组合到类中成为了成员属性 <code>targetCache</code>，所以可以大胆猜测 <code>TransactionAwareCacheDecorator</code> 是一个装饰类，不过这里并没有抽象装饰类，且 <code>TransactionAwareCacheDecorator</code> 没有子类，这里的装饰类关系并没有 Java I/O 中的装饰关系那么复杂</p><figure><img src="http://img.jssjqd.cn/20200708180408.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>spring cache 中类图关系</p><p>该类的主要功能：通过 Spring 的 <code>TransactionSynchronizationManager</code> 将其 <code>put/evict/clear</code> 操作与 Spring 管理的事务同步，仅在成功的事务的 <code>after-commit</code> 阶段执行实际的缓存 <code>put/evict/clear</code> 操作。如果没有事务是 <code>active</code> 的，将立即执行 <code>put/evict/clear</code> 操作</p><h4 id="spring-session-中的装饰者模式" tabindex="-1"><a class="header-anchor" href="#spring-session-中的装饰者模式" aria-hidden="true">#</a> spring session 中的装饰者模式</h4><blockquote><p>注意：适配器模式的结尾也可能是 Wrapper</p></blockquote><p>类 <code>ServletRequestWrapper</code> 的代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ServletRequestWrapper implements ServletRequest {   

    private ServletRequest request;    
    
    public ServletRequestWrapper(ServletRequest request) {        
        if (request == null) {            
        throw new IllegalArgumentException(&quot;Request cannot be null&quot;);        
        }        
    	this.request = request;    
    }    
    
    @Override    
    public Object getAttribute(String name) {        
    	return this.request.getAttribute(name);    
    }    
    //...省略...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到该类对 <code>ServletRequest</code> 进行了包装，这里是一个装饰者模式，再看下图，spring session 中 <code>SessionRepositoryFilter</code> 的一个内部类 <code>SessionRepositoryRequestWrapper</code> 与 <code>ServletRequestWrapper</code> 的关系</p><figure><img src="http://img.jssjqd.cn/20200708180436.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>ServletRequest 类图</p><p>可见 <code>ServletRequestWrapper</code> 是第一层包装，<code>HttpServletRequestWrapper</code> 通过继承进行包装，增加了 HTTP 相关的功能，<code>SessionRepositoryRequestWrapper</code> 又通过继承进行包装，增加了 Session 相关的功能</p><h4 id="mybatis-缓存中的装饰者模式" tabindex="-1"><a class="header-anchor" href="#mybatis-缓存中的装饰者模式" aria-hidden="true">#</a> Mybatis 缓存中的装饰者模式</h4><p><code>org.apache.ibatis.cache</code> 包的文件结构如下所示</p><figure><img src="http://img.jssjqd.cn/20200708180505.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Mybatis cache 中的装饰者模式</p><p>我们通过类所在的包名即可判断出该类的角色，<code>Cache</code> 为抽象构件类，<code>PerpetualCache</code> 为具体构件类，<code>decorators</code> 包下的类为装饰类，没有抽象装饰类</p><p>通过名称也可以判断出装饰类所要装饰的功能</p><h3 id="装饰者模式总结" tabindex="-1"><a class="header-anchor" href="#装饰者模式总结" aria-hidden="true">#</a> 装饰者模式总结</h3><p>装饰模式的<strong>主要优点</strong>如下：</p><ol><li><p>对于扩展一个对象的功能，装饰模式比继承更加灵活性，不会导致类的个数急剧增加。</p></li><li><p>可以通过一种动态的方式来扩展一个对象的功能，通过配置文件可以在运行时选择不同的具体装饰类，从而实现不同的行为。</p></li><li><p>可以对一个对象进行多次装饰，通过使用不同的具体装饰类以及这些装饰类的排列组合，可以创造出很多不同行为的组合，得到功能更为强大的对象。</p></li><li><p>具体构件类与具体装饰类可以独立变化，用户可以根据需要增加新的具体构件类和具体装饰类，原有类库代码无须改变，符合 “开闭原则”。</p></li></ol><p>装饰模式的<strong>主要缺点</strong>如下：</p><ol><li><p>使用装饰模式进行系统设计时将产生很多小对象，这些对象的区别在于它们之间相互连接的方式有所不同，而不是它们的类或者属性值有所不同，大量小对象的产生势必会占用更多的系统资源，在一定程序上影响程序的性能。</p></li><li><p>装饰模式提供了一种比继承更加灵活机动的解决方案，但同时也意味着比继承更加易于出错，排错也很困难，对于多次装饰的对象，调试时寻找错误可能需要逐级排查，较为繁琐。</p></li></ol><p><strong>适用场景</strong>：</p><ol><li><p>在不影响其他对象的情况下，以动态、透明的方式给单个对象添加职责。</p></li><li><p>当不能采用继承的方式对系统进行扩展或者采用继承不利于系统扩展和维护时可以使用装饰模式。不能采用继承的情况主要有两类：第一类是系统中存在大量独立的扩展，为支持每一种扩展或者扩展之间的组合将产生大量的子类，使得子类数目呈爆炸性增长；第二类是因为类已定义为不能被继承（如 Java 语言中的 final 类）。</p></li></ol><blockquote><p>参考：  <br> 刘伟：设计模式 Java 版  <br> 慕课网 java 设计模式精讲 Debug 方式 + 内存分析    <br> Java 日志框架：slf4j 作用及其实现原理  <br> HankingHu：由装饰者模式来深入理解 Java I/O 整体框架  <br> HryReal：Java 的 io 类的使用场景</p></blockquote>`,116),s=[r];function d(l,c){return i(),n("div",null,s)}const o=e(t,[["render",d],["__file","index.html.vue"]]);export{o as default};
