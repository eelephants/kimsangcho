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
    justify-content: right;
    align-items: center;
}

.subject-warpper .prImage-wrapper{
   position: relative;
   width: 25rem;
   height: auto;
   box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}

.subject-warpper .prImage-wrapper .birth{
   position: absolute;
   top: 12px;
   right: -109px;
   color: #fc6076;
   font-wight: bold;
   font-size: 1.7rem;
}

.subject-warpper .prImage-wrapper::after{
    position: absolute;
    content: '';
    border-bottom: 1px #fc6076 solid;
    top: -49px;
    right: -50px;
    height: 76px;
    width: 76px;
    display: block;
}

.subject-warpper img{
   width: 100%;
   height: 100%;
}


.contact-warpper .title{
   color:  #fc6076;
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
  
  color: #fc6076; 
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
    height: 200vh;
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
            <div class="birth">1990</div>
        </div>
    </div>
    <div class="mobile">
        <h3 class="title">Contact.</h3>
        <div>Email. wjdrms1919@gmail.com</div>
        <div>Phone. +82 010-9655-6387</div>
        <hr>
        <h3 class="title">Channel.</h3>
        <div>Blog. <a href="https://sangcho.tistory.com" target="_blank">sangcho.tistory.com</a></div>
        <div>Github. <a href="https://github.com/SangchoKim" target="_blank">github.com/SangchoKim</a></div>
        <div>Facebook. <a href="https://www.facebook.com/belle.korea.store" target="_blank">facebook.com/belle.korea.store</a></div>
        <div>LinkedIn. <a href="https://www.linkedin.com/in/rlatkdch14/" target="_blank">linkedin.com/in/rlatkdch14/</a></div>
        <hr>
        <h3 class="title">Skill.</h3>
        <div>Front-End. JavaScript, TypeScript, React.js, React-native, HTML/CSS</div>
        <div>Database. MySQL, MongoDB</div>
        <div>Disign. Figma</div>
        <div>Language. English</div>
        <hr>
        <h3 class="title">Education.</h3>
        <div>2019.09 - 2021.08. 방송통신대학교 컴퓨터공학과 졸업</div>
        <div>2010.03 - 2018.02 한국체육대학교 스포츠청소년지도학과 졸업</div>
        <hr>
        <h3 class="title">Certificate.</h3>
        <div>2021.05. SQLD</div>
        <div>2018.05. 정보처리기사</div>
        <div>2018.05. 정보처리산업기사</div>
        <div>2014.12. 스포츠경영관리사</div>
        <div>2014.01. 워드프로세서</div>
        <div>2013.12. 컴퓨터활용능력2급</div>
        <hr>
    </div>
</div>

<div class="empty" ></div> 

<div class="contact-warpper" >
    <h3 class="title">Contact.</h3>
    <div>Email. wjdrms1919@gmail.com</div>
    <div>Phone. +82 010-9655-6387</div>
    <hr>
    <h3 class="title">Channel.</h3>
    <div>Blog. <a href="https://sangcho.tistory.com" target="_blank">sangcho.tistory.com</a></div>
    <div>Github. <a href="https://github.com/SangchoKim" target="_blank">github.com/SangchoKim</a></div>
    <div>Facebook. <a href="https://www.facebook.com/belle.korea.store" target="_blank">facebook.com/belle.korea.store</a></div>
    <div>LinkedIn. <a href="https://www.linkedin.com/in/rlatkdch14/" target="_blank">linkedin.com/in/rlatkdch14/</a></div>
    <hr>
    <h3 class="title">Skill.</h3>
    <div>Front-End. JavaScript, TypeScript, React.js, React-native, HTML/CSS</div>
    <div>Database. MySQL, MongoDB</div>
    <div>Disign. Figma</div>
    <div>Language. English</div>
    <hr>
    <h3 class="title">Education.</h3>
    <div>2019.09 - 2021.08. 방송통신대학교 컴퓨터공학과 졸업</div>
    <div>2010.03 - 2018.02 한국체육대학교 스포츠청소년지도학과 졸업</div>
    <hr>
    <h3 class="title">Certificate.</h3>
    <div>2021.05. SQLD</div>
    <div>2018.05. 정보처리기사</div>
    <div>2018.05. 정보처리산업기사</div>
    <div>2014.12. 스포츠경영관리사</div>
    <div>2014.01. 워드프로세서</div>
    <div>2013.12. 컴퓨터활용능력2급</div>
    <hr>
</div>



