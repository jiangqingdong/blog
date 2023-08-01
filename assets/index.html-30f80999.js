import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as l,c as v,a as i,b as n,e as a,f as t}from"./app-21ce620e.js";const r={},u=i("h1",{id:"进程间通信-ipc",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#进程间通信-ipc","aria-hidden":"true"},"#"),n(" 进程间通信（IPC）：")],-1),m=i("p",null,"进程间通信的方式有很多，这里主要讲到进程间通信的六种方式，分别为：管道、FIFO、消息队列、共享内存、信号、信号量。",-1),c={href:"https://blog.csdn.net/qq_34343254/article/details/107431229",target:"_blank",rel:"noopener noreferrer"},b=t(`<h1 id="一、管道" tabindex="-1"><a class="header-anchor" href="#一、管道" aria-hidden="true">#</a> 一、管道</h1><p>管道的特点：</p><p>是一种半双工的通信方式；只能在具有亲缘关系的进程间使用. 进程的亲缘关系一般指的是父子关系；它可以看成是一种特殊的文件，对于它的读写也可以使用普通的 read、write 等函数。但是它不是普通的文件，并不属于其他任何文件系统，并且只存在于内存中。</p><p>管道的原型：</p><p>#include &lt;unistd.h&gt;</p><p>int pipe(int pipefd[2]);</p><p>代码实现：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;
 
/*使用匿名管道实现进程间通信*/
int main()
{
        int fd[2];//fd[0]为读端 fd[1]为写端
        pid_t pid;
        char buf[128];
        //int pipe(int pipefd[2]);
        if(pipe(fd) == -1)//创建管道
        {
                printf(&quot;管道创建失败\\n&quot;);
                perror(&quot;why&quot;);
        }
 
        pid = fork();
 
        if(pid &lt; 0 )
        {
                printf(&quot;子进程开辟失败\\n&quot;);
                perror(&quot;why&quot;);
        }else if(pid &gt; 0){
 
                sleep(3);//让子进程先执行
                printf(&quot;这是一个父进程\\n&quot;);//父进程完成写操作
                close(fd[0]);
                write(fd[1],&quot;hello from father&quot;,strlen(&quot;hello from father&quot;));
        }else{
 
                printf(&quot;这是一个子进程\\n&quot;);//子进程完成读操作
                close(fd[1]);
                read(fd[0],buf,sizeof(buf));//没有数据来时，阻塞在这
                printf(&quot;buf = %s\\n&quot;,buf);
        }
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="二、fifo" tabindex="-1"><a class="header-anchor" href="#二、fifo" aria-hidden="true">#</a> 二、FIFO</h1><p>FIFO，也叫做命名管道，它是一种文件类型。</p><p>FIFO 的特点：</p><p>FIFO 可以在无关的进程之间交换数据，与无名管道不同；FIFO 有路径名与之相关联，它以一种特殊设备文件形式存在于文件系统中。</p><p>FIFO 的原型：</p><p>#include &lt;sys/types.h&gt;</p><p>#include &lt;sys/stat.h&gt;</p><p>int mkfifo(const char *pathname, mode_t mode);</p><p>其中的 mode 参数与 open 函数中的 mode 相同。一旦创建了一个 FIFO，就可以用一般的文件 I/O 函数操作它。</p><p>当 open 一个 FIFO 时，是否设置非阻塞标志（O_NONBLOCK）的区别：</p><ul><li>若没有指定 O_NONBLOCK（默认），只读 open 要阻塞到某个其他进程为写而打开此 FIFO。类似的，只写 open 要阻塞到某个其他进程为读而打开它。</li><li>若指定了 O_NONBLOCK，则只读 open 立即返回。而只写 open 将出错返回 -1 如果没有进程已经为读而打开该 FIFO，其 errno 置 ENXIO。</li></ul><p>代码实现：</p><p>下列代码有效解决了，当管道存在时，程序报错的问题，减少了无关错误信息的打印。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;sys/types.h&gt;
#include &lt;sys/stat.h&gt;
#include &lt;errno.h&gt;
//       int mkfifo(const char *pathname, mode_t mode);
 
int main()
{
        if(mkfifo(&quot;myfifo&quot;,0600) == -1 &amp;&amp; errno != EEXIST)
        {
                printf(&quot;mkfifo failed\\n&quot;);
                perror(&quot;why&quot;);
        }
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>read.c</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;sys/types.h&gt;
#include &lt;sys/stat.h&gt;
#include &lt;errno.h&gt;
#include &lt;fcntl.h&gt;
#include &lt;unistd.h&gt;
 
//       int mkfifo(const char *pathname, mode_t mode);
 
int main()
{
        int nread;
        char buf[30] = {&#39;\\0&#39;};
 
        if(mkfifo(&quot;myfifo&quot;,0600) == -1 &amp;&amp; errno != EEXIST)//创建命名管道
        {
                printf(&quot;mkfifo failed\\n&quot;);
                perror(&quot;why&quot;);
        }
 
        int fd = open(&quot;./myfifo&quot;,O_RDONLY);//以只读的形式打开管道,程序阻塞在这，直到有另一个进程对其执行写操作
        if(fd &lt; 0)
        {
                printf(&quot;read open failed\\n&quot;);
        }else
        {
                printf(&quot;read open successn\\n&quot;);
        }
 
        while(1)
        {
                nread = read(fd,buf,sizeof(buf));
                printf(&quot;read %d byte,context is:%s\\n&quot;,nread,buf);
        }
 
        close(fd);
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>write.c</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;sys/types.h&gt;
#include &lt;sys/stat.h&gt;
#include &lt;errno.h&gt;
#include &lt;unistd.h&gt;
#include &lt;fcntl.h&gt;
#include &lt;string.h&gt;
//       int mkfifo(const char *pathname, mode_t mode);
 
int main()
{
        int nread;
        char buf[30] = &quot;message from myfifo&quot;;
 
        if(mkfifo(&quot;myfifo&quot;,0600) == -1 &amp;&amp; errno != EEXIST)//创建命名管道
        {
                printf(&quot;mkfifo failed\\n&quot;);
                perror(&quot;why&quot;);
        }
 
        int fd = open(&quot;./myfifo&quot;,O_WRONLY);//打开管道，程序阻塞在这，直到其他进程为读而打开它
        if(fd &lt; 0)
        {
                printf(&quot;write open failed\\n&quot;);
        }
        else
        {
                printf(&quot;write open success\\n&quot;);
        }
 
        while(1)
        {
                sleep(1);
                write(fd,buf,strlen(buf));
        }
        close(fd);
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="三、消息队列" tabindex="-1"><a class="header-anchor" href="#三、消息队列" aria-hidden="true">#</a> 三、消息队列</h1><p>消息队列，是消息的链接表，存放在内核之中。一个消息队列由一个标识符（即队列 ID）来标识。</p><p>用户进程可以向消息队列添加消息，也可以向消息队列读取消息。</p><p>消息队列的特点：</p><p>消息队列是面向记录的，其中的消息具有特定的格式以及特定的优先级；消息队列是独立于发送和接收进程的，进程终止时，消息队列及其内容并不会被删除；消息队列可以实现消息的随机查询，消息不一定要以先进先出的次序读取，也可以按消息的类型读取。</p><p>消息队列函数的原型：</p><p>// 创建或打开消息队列：成功返回队列 ID，失败返回 - 1 int msgget(key_t key, int flag); // 添加消息：成功返回 0，失败返回 - 1 int msgsnd(int msqid, const void *ptr, size_t size, int flag); // 读取消息：成功返回消息数据的长度，失败返回 - 1 int msgrcv(int msqid, void *ptr, size_t size, long type,int flag); // 控制消息队列：成功返回 0，失败返回 - 1 int msgctl(int msqid, int cmd, struct msqid_ds *buf);</p><p>代码演示：</p><p>msgSend.c</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;sys/types.h&gt;
#include &lt;sys/ipc.h&gt;
#include &lt;sys/msg.h&gt;
#include &lt;string.h&gt;
//       int msgget(key_t key, int msgflg);
// int msgsnd(int msqid, const void *msgp, size_t msgsz, int msgflg);
 
//       ssize_t msgrcv(int msqid, void *msgp, size_t msgsz, long msgtyp,int msgflg);
struct msgbuf{
        long mtype;       /* message type, must be &gt; 0 */
        char mtext[128];    /* message data */
};
 
 
int main()
{
        struct msgbuf sendbuf={888,&quot;message from send&quot;};
        struct msgbuf readbuf;
 
        key_t key;
 
        if((key = ftok(&quot;.&quot;,&#39;z&#39;)) &lt; 0){
                printf(&quot;ftok error\\n&quot;);
        }
        int msgId = msgget(key,IPC_CREAT|0777);
 
        if(msgId == -1){
                printf(&quot;get quen failed\\n&quot;);
        }
 
        msgsnd(msgId,&amp;sendbuf,strlen(sendbuf.mtext),0);
        printf(&quot;send over\\n&quot;);
 
        msgrcv(msgId,&amp;readbuf,sizeof(readbuf.mtext),999,0);
        printf(&quot;read from get is:%s\\n&quot;,readbuf.mtext);
 
        msgctl(msgId,IPC_RMID,NULL);
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>msgGet.c</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;sys/types.h&gt;
#include &lt;sys/ipc.h&gt;
#include &lt;sys/msg.h&gt;
#include &lt;string.h&gt;
//       int msgget(key_t key, int msgflg);
// int msgsnd(int msqid, const void *msgp, size_t msgsz, int msgflg);
 
//       ssize_t msgrcv(int msqid, void *msgp, size_t msgsz, long msgtyp,int msgflg);
struct msgbuf{
        long mtype;       /* message type, must be &gt; 0 */
        char mtext[128];    /* message data */
};
 
int main()
{
        struct msgbuf readbuf;
        memset(readbuf.mtext, &#39;\\0&#39;, sizeof(readbuf.mtext));
        struct msgbuf sendbuf={999,&quot;thank for your reach&quot;};
 
        key_t key;
 
        //获取key值
        if((key = ftok(&quot;.&quot;,&#39;z&#39;)) &lt; 0){
                printf(&quot;ftok error\\n&quot;);
        }
 
        int msgId = msgget(key,IPC_CREAT|0777);
 
        if(msgId == -1){
                printf(&quot;get quen failed\\n&quot;);
                perror(&quot;why&quot;);
        }
 
        msgrcv(msgId,&amp;readbuf,sizeof(readbuf.mtext),888,0);
        printf(&quot;read from send is:%s\\n&quot;,readbuf.mtext);
 
        msgsnd(msgId,&amp;sendbuf,strlen(sendbuf.mtext),0);
 
        msgctl(msgId,IPC_RMID,NULL);
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="四、共享内存" tabindex="-1"><a class="header-anchor" href="#四、共享内存" aria-hidden="true">#</a> 四、共享内存</h1><p>共享内存，指两个或多个进程共享一个给定的存储区。</p><p>ipcs -m 查看系统下已有的共享内存；ipcrm -m shmid 可以用来删除共享内存。</p><p>共享内存的特点：</p><p>共享内存是最快的一种 IPC，因为进程是直接对内存进行存取。因为多个进程可以同时操作，所以需要进行同步。信号量 + 共享内存通常结合在一起使用，信号量用来同步对共享内存的访问。</p><p>共享内存函数的原型：</p><p>// 创建或获取一个共享内存：成功返回共享内存 ID，失败返回 - 1 int shmget(key_t key, size_t size, int flag); // 连接共享内存到当前进程的地址空间：成功返回指向共享内存的指针，失败返回 - 1 void *shmat(int shm_id, const void *addr, int flag); // 断开与共享内存的连接：成功返回 0，失败返回 - 1 int shmdt(void *addr); // 控制共享内存的相关信息：成功返回 0，失败返回 - 1 int shmctl(int shm_id, int cmd, struct shmid_ds *buf);</p><p>代码演示：</p><p>shmw.c</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;unistd.h&gt;
#include &lt;sys/ipc.h&gt;
#include &lt;sys/shm.h&gt;
 
//       int shmget(key_t key, size_t size, int shmflg);
// void *shmat(int shmid, const void *shmaddr, int shmflg);
 
//       int shmdt(const void *shmaddr);
 
int main()
{
        int shmId;
        key_t key;
        char *shmaddr;
 
        if((key = ftok(&quot;.&quot;,1)) &lt; 0){
                printf(&quot;ftok error\\n&quot;);
        }
 
        shmId = shmget(key, 1024*4, IPC_CREAT|0666);//内存大小必须得是MB的整数倍
 
        if(shmId == -1){
                printf(&quot;shmget error\\n&quot;);
                exit(-1);
        }
 
        /*第二个参数一般写0，让linux内核自动分配空间，第三个参数也一般写0，表示可读可写*/
        shmaddr = shmat(shmId, 0, 0);
        printf(&quot;shmat OK\\n&quot;);
        strcpy(shmaddr,&quot;I am so cool&quot;);
 
        sleep(5);//等待5秒，让别的进程去读
 
        shmdt(shmaddr);
        shmctl(shmId, IPC_RMID, 0);//写0表示不关心
        printf(&quot;quit\\n&quot;);
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>shmr.c</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;sys/ipc.h&gt;
#include &lt;sys/shm.h&gt;
 
//       int shmget(key_t key, size_t size, int shmflg);
// void *shmat(int shmid, const void *shmaddr, int shmflg);
 
//       int shmdt(const void *shmaddr);
 
int main()
{
        int shmId;
        key_t key;
        char *shmaddr;
 
        if((key = ftok(&quot;.&quot;,1)) &lt; 0){
                printf(&quot;ftok error\\n&quot;);
        }
 
        shmId = shmget(key, 1024*4, 0);//内存大小必须得是MB的整数倍
 
        if(shmId == -1){
                printf(&quot;shmget error\\n&quot;);
                exit(-1);
        }
 
        /*第二个参数一般写0，让linux内核自动分配空间，第三个参数也一般写0，表示可读可写*/
        shmaddr = shmat(shmId, 0, 0);
        printf(&quot;shmat OK\\n&quot;);
        printf(&quot;data : %s\\n&quot;,shmaddr);
 
        shmdt(shmaddr);
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="五、信号" tabindex="-1"><a class="header-anchor" href="#五、信号" aria-hidden="true">#</a> 五、信号</h1><p>对于 Linux 来说，实际信号是软中断，许多重要的程序都需要处理信号。终端用户输入了 ctrl+c 来中断程序，会通过信号机制停止一个程序。</p><p>信号的相关概述：</p><p>1、信号的名字和编号：</p><p>每个信号都有一个名字和编号，这些名字都以 “SIG” 开头。我们可以通过 kill -l 来查看信号的名字以及序号。</p><figure><img src="https://img.jssjqd.cn/202305261749289.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>不存在 0 信号，kill 对于 0 信号有特殊的应用。</p><p>2、信号的处理：</p><p>信号的处理有三种方法，分别是：忽略、捕捉和默认动作。</p><ul><li>忽略信号，大多数信号可以使用这个方式来处理，但是有两种信号不能被忽略（分别是 <code>SIGKILL</code>和<code>SIGSTOP</code>）；</li><li>捕捉信号，需要告诉内核，用户希望如何处理某一种信号，说白了就是写一个信号处理函数，然后将这个函数告诉内核。当该信号产生时，由内核来调用用户自定义的函数，以此来实现某种信号的处理。</li><li>系统默认动作，对于每个信号来说，系统都对应由默认的处理动作，当发生了该信号，系统会自动执行。具体的信号默认动作可以使用<code>man 7 signal</code>来查看系统的具体定义。</li></ul><p>信号处理函数的注册：</p><ol><li>入门版：函数<code>signal</code></li><li>高级版：函数<code>sigaction</code></li></ol><p>信号处理发送函数：</p><ol><li>入门版：kill</li><li>高级版：sigqueue</li></ol><p>入门版：</p><p>函数原型：</p><p>// 接收函数，第二个参数指向信号处理函数</p><p>sighandler_t signal(int signum, sighandler_t handler);</p><p>// 发送函数 int kill(pid_t pid, int sig);</p><p>接收端：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;signal.h&gt;
 
//       typedef void (*sighandler_t)(int);
 
//       sighandler_t signal(int signum, sighandler_t handler);
/*接受到信号后，让信号处理该函数*/
void handler(int signum)
{
        printf(&quot;signum = %d\\n&quot;,signum);
 
        switch(signum){
                case 2:
                        printf(&quot;SIGINT\\n&quot;);
                        break;
                case 9:
                        printf(&quot;SIGKILL\\n&quot;);
                        break;
                case 10:
                        printf(&quot;SIGUSR1\\n&quot;);
                        break;
        }
}
 
int main()
{
        signal(SIGINT,handler);
        signal(SIGKILL,handler);
        signal(SIGUSR1,handler);
 
        while(1);
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发送端：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;sys/types.h&gt;
#include &lt;signal.h&gt;
#include &lt;stdlib.h&gt;
 
//       int kill(pid_t pid, int sig);
 
int main(int argc,char **argv)
{
        int signum;
        int pid;
 
        signum = atoi(argv[1]);//将字符型转为整型
        pid = atoi(argv[2]);
 
        kill(pid,signum);
 
        printf(&quot;signum = %d,pid = %d\\n&quot;,signum,pid);
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>高级版：</p><p>函数原型：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;signal.h&gt;
int sigaction(int signum, const struct sigaction *act, struct sigaction *oldact);
 
struct sigaction {
   void       (*sa_handler)(int); //信号处理程序，不接受额外数据，SIG_IGN 为忽略，SIG_DFL 为默认动作
   void       (*sa_sigaction)(int, siginfo_t *, void *); //信号处理程序，能够接受额外数据和sigqueue配合使用
   sigset_t   sa_mask;//阻塞关键字的信号集，可以再调用捕捉函数之前，把信号添加到信号阻塞字，信号捕捉函数返回之前恢复为原先的值。
   int        sa_flags;//影响信号的行为SA_SIGINFO表示能够接受数据
 };
//回调函数句柄sa_handler、sa_sigaction只能任选其一
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们只需要配置 sa_sigaction 以及 sa_flags 即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>siginfo_t {
               int      si_signo;    /* Signal number */
               int      si_errno;    /* An errno value */
               int      si_code;     /* Signal code */
               int      si_trapno;   /* Trap number that caused
                                        hardware-generated signal
                                        (unused on most architectures) */
               pid_t    si_pid;      /* Sending process ID */
               uid_t    si_uid;      /* Real user ID of sending process */
               int      si_status;   /* Exit value or signal */
               clock_t  si_utime;    /* User time consumed */
               clock_t  si_stime;    /* System time consumed */
               sigval_t si_value;    /* Signal value */
               int      si_int;      /* POSIX.1b signal */
               void    *si_ptr;      /* POSIX.1b signal */
               int      si_overrun;  /* Timer overrun count; POSIX.1b timers */
               int      si_timerid;  /* Timer ID; POSIX.1b timers */
               void    *si_addr;     /* Memory location which caused fault */
               int      si_band;     /* Band event */
               int      si_fd;       /* File descriptor */
}
#include &lt;signal.h&gt;
int sigqueue(pid_t pid, int sig, const union sigval value);
union sigval {
   int   sival_int;
   void *sival_ptr;
 };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接收端：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;signal.h&gt;
#include &lt;sys/types.h&gt;
#include &lt;unistd.h&gt;
 
//       int sigaction(int signum, const struct sigaction *act,struct sigaction *oldact);
 
//(*sa_sigaction)(int, siginfo_t *, void *);
void handler(int signum, siginfo_t *info, void *context)
{
        printf(&quot;get signum is:%d\\n&quot;,signum);
 
        if(context != NULL)
        {
                printf(&quot;get data = %d\\n&quot;,info-&gt;si_int);
                printf(&quot;get data = %d\\n&quot;,info-&gt;si_value.sival_int);
                printf(&quot;get pid is = %d\\n&quot;,info-&gt;si_pid);
        }
 
}
 
int main()
{
        struct sigaction act;
        printf(&quot;pid = %d\\n&quot;,getpid());
        act.sa_sigaction = handler;
        act.sa_flags = SA_SIGINFO;
 
        sigaction(SIGUSR1,&amp;act,NULL);
        while(1);
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发送端：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;signal.h&gt;
#include &lt;stdio.h&gt;
#include &lt;sys/types.h&gt;
#include &lt;unistd.h&gt;
#include &lt;stdlib.h&gt;
//       int sigqueue(pid_t pid, int sig, const union sigval value);
 
int main(int argc,char **argv)
{
        int signum;
        int pid;
 
        signum = atoi(argv[1]);
        pid = atoi(argv[2]);
 
        union sigval value;
        value.sival_int = 100;
 
        sigqueue(pid,signum,value);
        printf(&quot;pid = %d,done\\n&quot;,getpid());
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：信号发送字符串，只有在父子进程或者是共享内存下才可发送。</p><h1 id="六、信号量" tabindex="-1"><a class="header-anchor" href="#六、信号量" aria-hidden="true">#</a> 六、信号量</h1><p>信号量与已经介绍过的 IPC 结构不同，它是一个计数器。信号量用于实现进程间的互斥与同步，而不是用于存储进程间通信数据。</p><p>信号量的特点：</p><p>信号量用于进程间同步，若要在进程间传递数据需要结合共享内存。信号量基于操作系统的 PV 操作，程序对信号量的操作都是原子操作。每次对信号量的 PV 操作不仅限于对信号量值加 1 或减 1，而且可以加减任意正整数。支持信号量组</p><p>信号量的函数原型：</p><p>// 创建或获取一个信号量组：若成功返回信号量集 ID，失败返回 - 1 int semget(key_t key, int num_sems, int sem_flags); // 对信号量组进行操作，改变信号量的值：成功返回 0，失败返回 - 1 int semop(int semid, struct sembuf semoparray[], size_t numops);<br> // 控制信号量的相关信息 int semctl(int semid, int sem_num, int cmd, ...);</p><p>当 <code>semget</code> 创建新的信号量集合时，必须指定集合中信号量的个数（即 <code>num_sems</code>），通常为 1； 如果是引用一个现有的集合，则将 <code>num_sems</code> 指定为 0 。</p><p>在 <code>semop</code> 函数中，<code>sembuf</code> 结构的定义如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>struct sembuf 
{
    short sem_num; // 信号量组中对应的序号，0～sem_nums-1
    short sem_op;  // 信号量值在一次操作中的改变量
    short sem_flg; // IPC_NOWAIT, SEM_UNDO
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>semctl</code> 函数中的命令有多种，这里就说两个常用的：</p><ul><li><code>SETVAL</code>：用于初始化信号量为一个已知的值。</li><li><code>IPC_RMID</code>：删除一个信号量集合。如果不删除信号量，它将继续在系统中存在，即使程序已经退出，它可能在你下次运行此程序时引发问题，而且信号量是一种有限的资源。</li></ul><p>代码演示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;stdio.h&gt;
#include &lt;sys/types.h&gt;
#include &lt;sys/ipc.h&gt;
#include &lt;sys/sem.h&gt;
#include &lt;unistd.h&gt;
 
//       int semget(key_t key, int nsems, int semflg);
//       int semctl(int semid, int semnum, int cmd, ...);
//       int semop(int semid, struct sembuf *sops, size_t nsops);
union semun{
        int              val;    /* Value for SETVAL */
        struct semid_ds *buf;    /* Buffer for IPC_STAT, IPC_SET */
        unsigned short  *array;  /* Array for GETALL, SETALL */
        struct seminfo  *__buf;  /* Buffer for IPC_INFO
                                    (Linux-specific) */
};
 
//P操作，拿钥匙
void PGetKey(int semid)
{
        struct sembuf sops;
        sops.sem_num = 0;
        sops.sem_op = -1;
        sops.sem_flg = SEM_UNDO;
 
        semop(semid, &amp;sops, 1);
}
 
//V操作，放回钥匙
void VPutBackKey(int semid)
{
        struct sembuf sops;
        sops.sem_num = 0;
        sops.sem_op = 1;
        sops.sem_flg = SEM_UNDO;
 
        semop(semid, &amp;sops, 1);
}
 
int main()
{
        key_t key;
        int semid;
        if((key == ftok(&quot;.&quot;,6)) &lt; 0)
        {
                printf(&quot;ftok error\\n&quot;);
        }
 
        semid = semget(key , 1,  IPC_CREAT|0666);//创造钥匙，数量为1
 
        union semun sem;
        sem.val = 0;//初始状态为没有钥匙
        semctl(semid, 0, SETVAL, sem);//SETVAL初始化信号量为一个已知的值，这时就需要第四个参数
                     //0表示操作第一把钥匙
        int pid = fork();
 
        if(pid &lt; 0)
        {
                printf(&quot;fork failed\\n&quot;);
        }else if(pid == 0)
        {
                printf(&quot;this is child\\n&quot;);
                VPutBackKey(semid);//首先把钥匙放回     
        }else
        {
                PGetKey(semid);//等子进程将钥匙放回后才会进行操作，保证子进程先执行
                printf(&quot;this is father\\n&quot;);
                VPutBackKey(semid);
                semctl(semid, 0, IPC_RMID);//销毁钥匙
        }
 
        return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="七、进程间通信方式总结" tabindex="-1"><a class="header-anchor" href="#七、进程间通信方式总结" aria-hidden="true">#</a> 七、进程间通信方式总结：</h1><ol><li>管道：速度慢，容量有限，只有父子进程能通讯；</li><li>FIFO：任何进程间都能通讯，但速度慢；</li><li>消息队列：容量受到系统限制，且要注意第一次读的时候，要考虑上一次没有读完数据的问题；</li><li>共享内存：能够很容易控制容量，速度快，但要保持同步，比如一个进程在写的时候，另一个进程要注意读写的问题；</li><li>信号：有入门版和高级版两种，区别在于入门版注重动作，高级版可以传递消息。只有在父子进程或者是共享内存中，才可以发送字符串消息；</li><li>信号量：不能传递复杂消息，只能用来同步。用于实现进程间的互斥与同步，而不是用于存储进程间通信数据。</li></ol>`,98);function o(p,g){const e=d("ExternalLinkIcon");return l(),v("div",null,[u,m,i("p",null,[n("参考文章："),i("a",c,[n("https://blog.csdn.net/qq_34343254/article/details/107431229"),a(e)])]),b])}const _=s(r,[["render",o],["__file","index.html.vue"]]);export{_ as default};
