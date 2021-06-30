const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector('#result');

const endPoint = 13;
const choice1 = [];
const choice2 = [];
var point = 0;

// 획득포인트(value)에 따라 레벨(key)을 가져와 반환한다.
function getKeyByValue(point) {
  for(var key in fshipLevel){
    if(fshipLevel[key].includes(point)){
      return key;
    }
  }
  return 'no answer';
}

// choice1과 choice2의 값 비교 후 포인트 부여
function calResult(){
  for(let i = 0; i<choice1.length; i++){
    if(choice1[i]==choice2[i]){
      point++;
    }
  }
  console.log(point);
  return point;
}

// 출제자가 문제를 다 풀 경우 정답을 배열에 넣고 메인 화면으로 복귀
function goMain(){
  qna.style.WebkitAnimation="fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    main.style.WebkitAnimation="fadeIn 1s";
    main.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      main.style.display="block";
    }, 450)
  },450)
  }


  // 출제자와 참여자의 클릭 인덱스를 비교하여 점수 및 레벨 부여
  function setResult(){
    point = calResult();
    var level = getKeyByValue(point);

    const friendName = document.querySelector('.friendName');
    var self = document.querySelector('.txt_name').value;
    var friend = document.querySelector('.txt_friend').value;
    friendName.innerHTML = self +'와 '+friend+'의';

    var friendScore = Math.round(point/endPoint*100);
    const score = document.querySelector('.score');
    score.innerHTML = '우정모의고사 점수는 '+friendScore+'점';

    const resultName = document.querySelector('.resultName');
    console.log(infoList[level].name);
    resultName.innerHTML = infoList[level].name;
    resultName.classList.add('title');

    const resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-'+level+'.png';
    resultImg.src = imgURL;
    resultImg.alt = level;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[level].desc;
  }


  // 결과 페이지가 나타나는 함수
  function goResult(){
    qna.style.WebkitAnimation="fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
      result.style.WebkitAnimation="fadeIn 1s";
      result.style.animation = "fadeIn 1s";
      setTimeout(() => {
        qna.style.display = "none";
        result.style.display="block";
      }, 450)
    }, 450)

      console.log(choice1);
      console.log(choice2);
      setResult();
    }


    // 각 answer를 fadeIn해주고 click이 발생할 경우 해당 index를 배열에 담고 다음 문제로
    function addAnswer(answerText, qIdx, idx, diff){
      var a = document.querySelector('.ansBox');
      var answer = document.createElement('button');
      answer.classList.add('answerList');
      answer.classList.add('my-2');
      answer.classList.add('py-3');
      answer.classList.add('mx-auto');
      answer.classList.add('col-lg-6');
      answer.classList.add('col-md-8');
      answer.classList.add('col-sm-10');
      answer.classList.add('col-12');
      answer.classList.add('fadeIn');

      a.appendChild(answer);
      answer.innerHTML = answerText;

      answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i<children.length; i++){
          children[i].disabled = true;
          children[i].style.WebkitAnimation = "fadeOut 0.5s";
          children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
          if(diff==1){
            choice1[qIdx] = idx;
          }else if(diff==2){
            choice2[qIdx] = idx;
          }

          for(let i=0; i<children.length; i++){
            children[i].style.display='none';
          }
          goNext(++qIdx, diff);
        },450)
      }, false);
    }


    // qIdx번째 질문을 제시하고, 상태바를 제작한 뒤 addAnswer함수로 이동
    function goNext(qIdx, diff){
      if(qIdx === endPoint){
        if(diff === 1){
          goMain();
          return;
        }else if(diff === 2){
          goResult();
          return;
        }
      }
      var status = document.querySelector('.statusBar');
      status.style.width = (100/endPoint) * (qIdx+1) +'%';

      var q = document.querySelector('.qBox');
      q.innerHTML = qnaList[qIdx].q;
      for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i], qIdx, i, diff);
      }

    }


    // 메인페이지에서 qna 페이지로 처음 이동
    function begin(diff){
      main.style.WebkitAnimation="fadeOut 1s";
      main.style.animation = "fadeOut 1s";
      setTimeout(() => {
        qna.style.WebkitAnimation="fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
          main.style.display = "none";
          qna.style.display="block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx, diff);
      }, 450);
    }
