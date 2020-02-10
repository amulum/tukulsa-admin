import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions } from "../store/store";
import MiniDrawer from '../Components/Layout/MiniDrawer'
import { Typography } from '@material-ui/core'
import '../App.css'
import BoxElement from '../Components/BoxElement'
import TableTransaction from '../Components/TableTransaction'


const oke = <TableTransaction/>
class Transactions extends Component {
  state = {
    isLoading: true
  }
  componentDidMount = async () => {
    await this.props.getAllTransactions()
  }
  render() {
    const transaction = JSON.stringify(this.props.listAllTransactions)
    return (
      <Fragment >
      <MiniDrawer
      />
      {/* Content begin here */}
      <main  style={{padding:'1.5em', paddingTop:'8%', flexGrow:'1'}}>
        <Typography variant="h5" >
          Transactions
        </Typography>
        <BoxElement 
          value ={oke}
        />
        <Typography paragraph>
          Transactions
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
      {/* EOF content */}
    </Fragment>
    )
  }
}

export default connect('listAllTransactions', actions)  (withRouter(Transactions))