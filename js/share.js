
function kakaoShare(){

  const shareUrl = 'https://leedy-s2.github.io/friendship_test';

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '[우정 모의고사]',
      description: '우리 우정의 소소한 중간평가',
      imageUrl:
        'https://leedy-s2.github.io/friendship_test/img/main.gif',
      link: {
        mobileWebUrl: shareUrl,
        webUrl :shareUrl
      },
    },

    buttons: [
      {
        title: '우정테스트하기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl :'https://developers.kakao.com'
        },
      },
    ]
  });
}
