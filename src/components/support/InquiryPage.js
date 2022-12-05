import React, { useState, useEffect } from 'react'
import Input from '../styledcomponent/Input'
import StyledButton from 'components/styledcomponent/Button'
import TextArea from "antd/lib/input/TextArea";
import { Divider } from 'antd';
import { ReactComponent as Dot } from '../.././assets/icons/main/dot.svg'
import { useDispatch } from 'react-redux';
import { postSupportInquiry } from '../../redux/support/actions';
export default function InquiryPage() {

  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    title: null,
    content: null,
  })
  const [isEmpty, setIsEmpty] = useState(true)
  const desc = [
    '지원센터 운영 시간은 10:00 ~ 18:00입니다.',
    '문의 내용은 검토 후에 답변을 드릴 수 있습니다.',
    '검토 과정 상 당일 답변이 어려울 수 있습니다',
    '답변을 드리는 경우 알림을 통해서 확인하실 수 있습니다.'
  ]

  const extraDesc = '아래의 문의 등록하기 버튼을 누르면 문의 내용과 관련한 개인정보 수집 및 이용 동의를 승인한 것으로 처리됩니다.'

  useEffect(() => {
    if (inputs.title && inputs.content) {
      return setIsEmpty(false)
    }
    return setIsEmpty(true)
  }, [inputs])

  const handleChange = (e) => {

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  const handleClick = () => {
    console.log('clicked')
    dispatch(postSupportInquiry.call(inputs))
    setInputs('')
  }

  return (
    <div style={{ margin: 10 }}>
      <Input
        name='title'
        type='text'
        onChange={handleChange}
        value={inputs.title}
        placeholder="제목을 입력해주세요"
        margin="normal"
      />
      <TextArea
        style={{ marginTop: 15 }}
        rows={10}
        name='content'
        onChange={handleChange}
        value={inputs.content}
        placeholder="내용을 입력해주세요"

      />
      <Divider />
      <div>
        <p style={{ fontSize: 12, color: '#666666' }}>지원센터 운영 안내 </p>
        {
          desc.map((text, index) => {
            return <p key={text} style={{ margin: 0 }}> <Dot />  {' '}{text}</p>
          })
        }
      </div>

      <div style={{ marginTop: 20 }}>
        <p style={{ color: '#666666' }}>{extraDesc}</p>
      </div>
      <div style={{ marginTop: 20 }}>
        <StyledButton disabled={isEmpty} onClick={handleClick}>문의 등록하기</StyledButton>
      </div>


    </div>
  )
}
