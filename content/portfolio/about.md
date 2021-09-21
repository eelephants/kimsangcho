<style>
.subject-warpper{
    width: 50%;
    margin: 0 auto;
    font-size: 1.5rem;
    position: absolute;
    top: 30vh;
    left: 50%;
    transform: translateX(-50%);
}

.contact-warpper{
    width: 50%;
    margin: 0 auto;
    padding: 15px 0;
}

.intro-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.subject-warpper .prImage-wrapper{
   width: 16rem;
   height: auto;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}
.subject-warpper img{
   width: 100%;
   height: 100%;
}


.contact-warpper .title{
  color: rgb(142, 145, 98);
   font-size: 1.5rem;
}

.contact-warpper div {
    margin-bottom: 7px;
    word-spacing: 9px;
    font-size: 1.3rem;
}

.contact-warpper a {
    color: #dddd;
}

.subject-warpper .mobile{ 
    display: none;
}

.subject-warpper .title{
  
  color: rgb(142, 145, 98);
  font-size: 1.5rem;
}

.subject-warpper div {
    margin-bottom: 7px;
    word-spacing: 9px;
    font-size: 1.3rem;
}

.subject-warpper a {
    color: #dddd;
}

.empty {
    height: 80vh;
    overflow: hidden;
    display: none;
}

@media screen and (max-width: 1280px) {
    .subject-warpper .mobile {
        display: block;
    } 
    .contact-warpper{
        display: none;
    }

    .empty {
        display: block;
    }
}
</style>

<div class="subject-warpper">
    <h1 align="center">Santos &nbsp;|&nbsp; 나아가는 프론트 개발자</h1>
    <h4 align="center">2년차, 나아가는 프론트 개발자 김상초입니다.</h4>
    <div class="intro-wrapper">
        <div align="center" class="prImage-wrapper">
            <img src="../image/kimsangcho.jpg" alt="kimsangcho" >
        </div>
    </div>
    <div class="mobile">
        <h3 class="title">Contact.</h3>
        <div>Email. wjdrms1919@gmail.com</div>
        <div>Phone. +82 010-9655-6387</div>
        <h3 class="title">Channel.</h3>
        <div>Blog. <a href="https://sangcho.tistory.com" type="_blank">https://sangcho.tistory.com</a></div>
        <div>Github. <a href="https://github.com/SangchoKim">https://github.com/SangchoKim</a></div>
        <div>Facebook. <a href="https://www.facebook.com/belle.korea.store">https://www.facebook.com/belle.korea.store</a></div>
    </div>
</div>

<div class="empty" ></div> 

<div class="contact-warpper" >
    <h3 class="title">Contact.</h3>
    <div>Email. wjdrms1919@gmail.com</div>
    <div>Phone. +82 010-9655-6387</div>
    <h3 class="title">Channel.</h3>
    <div>Blog. <a href="https://sangcho.tistory.com" target="_blank">https://sangcho.tistory.com</a></div>
    <div>Github. <a href="https://github.com/SangchoKim" target="_blank">https://github.com/SangchoKim</a></div>
    <div>Facebook. <a href="https://www.facebook.com/belle.korea.store" target="_blank">https://www.facebook.com/belle.korea.store</a></div>
</div>

