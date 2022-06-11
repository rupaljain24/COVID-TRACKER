import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './casedetails.css'

function Casedetails({title,cases,total,...props}) {
    //const {title,cases,total}=props
   // const onClick={props.onClick}
  return (
      <Card className='casedetails__box' onClick={props.onClick}>
          <CardContent>
              <Typography className='title' color='textSecondary'>{title}</Typography>
              <h2 className='count'>{cases}</h2>
              <Typography className='total' color='textSecondary'>{total} Total</Typography>

          </CardContent>
      </Card>
    // <div className='casedetails'>Casedetails</div>
  )
}

export default Casedetails