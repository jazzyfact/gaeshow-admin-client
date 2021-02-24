import View from '../Core/Mvc/View.js'
import utils from '../Core/Singleton/utils.js'
import Singleton from '../Core/Singleton/Singleton.js'
import questionModel from '../Model/questionModel.js'
import questionCommentModel from '../Model/questionCommentModel.js'




export default class questionViewController{
    constructor(isLogin,myInfo,myGrade) {
         this._serviceId = utils().getParameterByName('n')
        //  console.log("인덱스번호",this._serviceId)



          // 알수 없는 페이지, 404 처리 해야함
          if (!this._serviceId) {
             console.error('404 not found')
         }
 
       
       
        this._view = new View()
        this._utils = new utils()
        this._singleton = new Singleton()
        this._questionModel = new questionModel()
        this._questionCommentModel = new questionCommentModel(this._serviceId)



        this._utils = new utils()

        this._myInfo = myInfo
        // console.log("내정보 확인",myInfo)
        this._myGrade = myGrade
        console.log("관리자등급 확인",myGrade)

      
        this._commentContent = this._view.getElement('#commentContent')
        this._commentCreatedAt =  this._view.getElement('#commentCreatedAt')
        this._adminNickname = this._view.getElement('#adminNickname')
        this._edit = this._view.getElement('#edit')
        this._inputComment =this._view.getElement('#inputComment')
        this._addCommentBtn =this._view.getElement('#addCommentBtn')
        this._editCommentBtn =this._view.getElement('#editCommentBtn')

        this._changeStatusBtn = this._view.getElement('#changeStatus') //처리상태


        // 답변 등록 이벤트 바인딩
        this._addCommentBtn.onclick = () => this.addCommentBtn()
        // 답변 수정 
        // const editBtn = this._view.getElement('#addCommentBtn')
        this._editCommentBtn.onclick = () => this.editBtn()

        this.lifeCycle()
    }

    lifeCycle  = async () => {
       
        
        await this.grade()
        await Promise.all([this.getPostData(), this.getCommentData()])
            .then((values) => {
                this.setPostData(values[0])
                this.setCommentData(values[1])
            })
            .catch((e) => {
                console.error(e)
            })


    
    }


    //권한설정
//등급 1,2,3 가능
grade = async () => {
    // console.log('등급',this._myGrade.grade)

    switch(this._myGrade){
        case 2:
      //회원관리
      this._userTitle=  this._view.getElement('#userTitle').classList.add('hidden')
      this._user=  this._view.getElement('#user').classList.add('hidden')
      this._admin=  this._view.getElement('#admin').classList.add('hidden') 
       this._removeUser=  this._view.getElement('#reomveUser').classList.add('hidden') 
      //광고관리
      this._adTitle=  this._view.getElement('#adTitle').classList.add('hidden')
      this._ad=  this._view.getElement('#ad').classList.add('hidden') 
      break
      case 3:
          //회원관리
      this._userTitle=  this._view.getElement('#userTitle').classList.add('hidden')
      this._user=  this._view.getElement('#user').classList.add('hidden')
      this._admin=  this._view.getElement('#admin').classList.add('hidden')
      this._removeUser=  this._view.getElement('#reomveUser').classList.add('hidden')
      //광고관리
      this._adTitle=  this._view.getElement('#adTitle').classList.add('hidden')
      this._ad=  this._view.getElement('#ad').classList.add('hidden')    
      //고객센터
      this._notice=  this._view.getElement('#notice').classList.add('hidden')
      this._faq=  this._view.getElement('#faq').classList.add('hidden')
     //상품관리
     this._productTitle = this._view.getElement('#productTitle').classList.add('hidden')//상품관리타이틀
     this._store=  this._view.getElement('#store').classList.add('hidden')//상품등록
     this._product=  this._view.getElement('#product').classList.add('hidden')//상품상담
      break
      case 4:
      //회원관리
      this._userTitle=  this._view.getElement('#userTitle').classList.add('hidden')
      this._user=  this._view.getElement('#user').classList.add('hidden')
      this._admin=  this._view.getElement('#admin').classList.add('hidden')
       this._removeUser=  this._view.getElement('#reomveUser').classList.add('hidden')
      //커뮤니티관리
      this._admin=  this._view.getElement('#communityTitle').classList.add('hidden')
      this._post=  this._view.getElement('#post').classList.add('hidden')
      this._comment=  this._view.getElement('#comment').classList.add('hidden')
      this._ide=  this._view.getElement('#ide').classList.add('hidden')
      this._lan=  this._view.getElement('#lan').classList.add('hidden')
      //광고관리
      this._adTitle=  this._view.getElement('#adTitle').classList.add('hidden')
      this._ad=  this._view.getElement('#ad').classList.add('hidden')
      //고객센터
      this._serviceCenterTitle=  this._view.getElement('#serviceCenterTitle').classList.add('hidden')
      this._notice=  this._view.getElement('#notice').classList.add('hidden')
      this._faq=  this._view.getElement('#faq').classList.add('hidden')
      this._question=  this._view.getElement('#question').classList.add('hidden')
      this._report=  this._view.getElement('#report').classList.add('hidden')
       //상품관리
      this._store=  this._view.getElement('#store').classList.add('hidden')
        break
    }
}




    
    getPostData = async () => {

        const resData =  await this._questionModel.getQuestionDetail(this._serviceId)
        // console.log("인덱스번호11",this._serviceId)
        // console.log('문의하기 상세내용',resData)
        return resData
    }
    getCommentData = async () => {
        const resData = await this._questionCommentModel.getComments(this._serviceId)
        // console.log("인덱스번호22",this._serviceId)
        // console.log('가져온 댓글 내용',resData)
        return resData
    }


    setPostData = (data) => {

        if (!data) return 

        // console.log("setPostData",data)
        this._serviceId = data.id
        
        //처리상태가 확인전이라면 => 처리중 버튼 보여주기
        //처리중이라면 => 처리완료 버튼 보여주기
        
        //처리상태
        const processStatus = data.inquire.process_status

        const changeStatusBtn = this._view.getElement('#changeStatus')
        switch(processStatus){    
            case "확인전":
                // this._view.getElement('#status').innerHTML = "처리상태 변경"
                this._changeStatusBtn.onchange = () => this.changeStatusClick(processStatus)
                // this._changeStatusBtn.onclick = () => this.changeStatusClick(this._serviceId)
                 //답변 했을 떄 숨기기
                 this._view.getElement('#answerView').classList.add('hidden')
                 //답변타이틀 숨기기
                 this._view.getElement('#commentTitle').classList.add('hidden')
                 //문의하기 답변 숨기기
                 this._view.getElement('#answerBox').classList.add('hidden')
                break
            case "처리중":
                //답변 했을 떄 타이틀 숨기기
                this._view.getElement('#answerView').classList.add('hidden')
                //처리상태변경, 처리중변경 숨기기
                this._view.getElement('#status').classList.add('hidden')
                this._view.getElement('#changeStatus').classList.add('hidden')
                break
            case "처리완료":
                  //답변타이틀 숨기기
                  this._view.getElement('#commentTitle').classList.add('hidden')
                  //처리상태변경, 처리중변경 숨기기
                  this._view.getElement('#status').classList.add('hidden')
                  this._view.getElement('#changeStatus').classList.add('hidden')
                break
        }

      //데이터 넣기
      this._view.getElement('#typeTitle').innerHTML = '문의타입 : '
      this._view.getElement('#type').innerHTML = data.inquire.type
      this._view.getElement('#processStatusTitle').innerHTML = '처리상태 : '
      this._view.getElement('#processStatus').innerHTML = data.inquire.process_status
      // this._view.getElement('#title').innerHTML = data.inquire.title
      this._view.getElement('#content').innerHTML = data.inquire.content
      this._view.getElement('#createdAtTitle').innerHTML = '문의한날짜 : '
      this._view.getElement('#createdAt').innerHTML =data.inquire.created_at
      this._view.getElement('#profileNicknameTitle').innerHTML = '문의한회원 : '
      this._view.getElement('#profileNickname').innerHTML = data.inquire.profile_nickname

      this._view.getElement('#title').innerHTML = data.inquire.title
      this._view.getElement('#editCommentBtn').hidden = true
    //   this._view.getElement('#contentTitle').innerHTML = '문의내용'


            // 포스트 내용
        //   const { content } = data
          // 퀼 적용
          // 퀼 생성
          this._quill = new Quill('#content', {
            modules: {
                toolbar: false
            },
            theme: 'snow',
            height: '30rem',
            readOnly: true
        })
        //게시물 내용
        const contentView = this._view.getElement('.ql-editor')
        contentView.innerHTML = data.inquire.content


    }

   
    //답변 셋팅
    setCommentData = (data) => {
        console.log("setCommentData 답변",data)
        if (!data) return
        // console.log("resStatus", data.stats)

        //댓글이 없는 경우 서버에서 {stats = 404 Not Found}를 받음
        //404인 경우 댓글 관련 댓글 item들을 숨기고
        //404가 아닌 경우에는 댓글 item들을 보여준다
        if (data.stats === "404 Not Found"){
            // console.log("404인경우",data.stats)
            this._view.getElement('#commentTitle').classList.add('hidden')
            this._view.getElement('#commentTitleView').classList.add('hidden')
            
            this._view.getElement('#addCommentBtn').innerHTML = '등록'

            this._commentContent.innerHTML = data.content  //답변 내용
            this._commentContent.hidden = true  
            this._commentCreatedAt.innerHTML = data.created_at //답변 등록 날짜
            this._commentCreatedAt.hidden = true  
            this._adminNickname.innerHTML = data.profile_nickname //답변 등록한 관리자
            this._adminNickname.hidden = true 
            this._edit.innerHTML = '답변수정'
            this._edit.hidden = true  
        }else{
            //서버에서 댓글을 받아온 경우
            // console.log("404가 아닐 때",data)
            this._view.getElement('#commentTitle').innerHTML = '답변 '
            this._view.getElement('#commentTitle').classList.remove('hidden')

            this._commentContent.innerHTML = data.content  
            this._commentContent.hidden = false  
            this._commentCreatedAt.innerHTML = data.created_at
            this._commentCreatedAt.hidden = false  
            this._adminNickname.innerHTML = data.profile_nickname
            this._adminNickname.hidden = false
            //답변 입력 폼 숨기기
            this._inputComment.hidden =true
            this._addCommentBtn.hidden =true
            this._editCommentBtn.hidden = true


            //자기가 작성한 답변만 수정가능
            if (data.admin_id ==  this._myInfo.user_id ) {
                // console.log("수정 할 수 있는 관리자")
                this._edit.innerHTML = '답변수정'
                this._edit.hidden = false
                this._edit.onclick = () => this.modBtnClick(this._serviceId = utils().getParameterByName('n'))
            }
           
        }
     }


     //답변추가
    addCommentBtn = async () => {
        // console.log("인덱스번호33",this._serviceId)
        const content = this._view.getElement('#inputComment').value
        // console.log("작성한 답변",content)

        if (!content) {
            utils().snackbar('댓글을 입력해주세요.')
            return
        }
        //필수데이터
        //게시글 인덱스, 답변내용
        const resData = await this._questionCommentModel.addComment(this._serviceId = utils().getParameterByName('n'),content)
        console.log("답변추가데이터",resData)

        if(resData.code === "already_exist_comment"){
            utils().snackbar('답변을 추가할 수 없습니다!.')
        }

        //답변 작성 후 페이지 이동
        window.location.href = `/question__view.html?n=${this._serviceId = utils().getParameterByName('n')}`
        // return resData  
        
        
    }

    //답변수정
    modBtnClick = async () => {
        // console.log('클릭'',resData)
        //수정버튼을 누르면 입력폼이 나오고
        //처리상태가 되면 댓글폼 없어짐
        const resData = await this._questionCommentModel.getComments(this._serviceId)
        // console.log('가져온 수정할 댓글 내용',resData)

        //댓글인덱스
        // resData.id = this._comment_id
        resData.id 
        // console.log('댓글인덱스',resData.id)
        this._view.getElement('#editCommentBtn').innerHTML = '수정'

        this._commentContent.innerHTML = resData.content  //답변 내용
        this._commentContent.hidden = true  
        this._commentCreatedAt.innerHTML = resData.created_at //답변 등록 날짜
        this._commentCreatedAt.hidden = true  
        this._adminNickname.innerHTML = resData.profile_nickname //답변 등록한 관리자
        this._adminNickname.hidden = true 
        this._edit.innerHTML = '답변수정'
        this._edit.hidden = true  
        //답변 입력 폼 보이게
        this._inputComment.hidden =false
        this._addCommentBtn.hidden =true
        this._editCommentBtn.hidden=false
        //답변타이틀 숨기기
        this._view.getElement('#answerView').classList.add('hidden')
        //수정타이틀보여주기
        this._view.getElement('#commentTitle').classList.remove('hidden')
        //기존에 답변했던 내용 넣어주기
        this._view.getElement('#inputComment').value = resData.content
        // console.log("기존 답변", resData.content)

       
        
    }

    //수정완료버튼
    editBtn = async () =>{
        console.log("수정완료버튼클릭")
        
        const resData = await this._questionCommentModel.getComments(this._serviceId = utils().getParameterByName('n'))
        // console.log('수정댓글 데이터',resData)

        resData.comment_id
        // console.log('댓글인덱스',resData.id)
        const content = this._view.getElement('#inputComment').value
        // console.log("수정한 답변", content)

        //수정
        await this._questionCommentModel.editComment(resData.comment_id, content)
        // console.log('수정한 데이터 입력한 값', resData.id, content)

          //수정후 페이지 이동
          window.location.href = `/question__view.html?n=${this._serviceId = utils().getParameterByName('n')}`
        

    }

    //처리상태 변경
    changeStatusClick = async () =>{

        const dialog = window.confirm(`처리상태를 변경하시겠습니까?`)
        if(dialog){
            await this._questionCommentModel.editStatus(this._serviceId = utils().getParameterByName('n'))
            console.log('처리상태 변경할 문의사항 인덱스 데이터',this._serviceId = utils().getParameterByName('n'))
          //수정후 페이지 이동
           window.location.href = `/question__view.html?n=${this._serviceId = utils().getParameterByName('n')}`
        }
        else{
            window.location.href = `/question__view.html?n=${this._serviceId = utils().getParameterByName('n')}`
        }



        // await this._questionCommentModel.editStatus(this._serviceId = utils().getParameterByName('n'))
        //   console.log('처리상태 변경할 문의사항 인덱스 데이터',this._serviceId = utils().getParameterByName('n'))
        // //수정후 페이지 이동
        //  window.location.href = `/question__view.html?n=${this._serviceId = utils().getParameterByName('n')}`
    }


}
