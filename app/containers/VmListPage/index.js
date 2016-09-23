/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';
import H1 from 'components/H1';

import styles from './styles.css';

import { apiCallStart } from '../App/actions';

import { selectWsConn, selectSession } from '../App/selectors';

export class VmListPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      list: [{
        key: 'test1',
        name: 'test1'
      }, {
        key: 'test2',
        name: 'test2'
      }]
    };
  };

  componentDidMount() {
    
  }


  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  queryList = () => {
    this.props.query({
      'org.zstack.header.vm.APIQueryVmInstanceMsg': {
        count: false,
        start: 0,
        replyWithCount: true,
        conditions: []
      }
    });
  }

  render() {
    return (
      <div>
        <Helmet
          title="VM Instance"
          meta={[
            { name: 'description', content: 'VM Instance page of ZStack' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <table>
          <tbody>
            {this.state.list.map(function(item){
              return <tr key={item.key}><td>{item.name}</td></tr>
            })}
          </tbody>
        </table>
        <Button onClick={this.queryList}>
          Query
        </Button>
      </div>
    );
  }
}

VmListPage.propTypes = {
  query: React.PropTypes.func,
  setWsConn: React.PropTypes.func,
};

// redux has to pass all functions through prop.
function mapDispatchToProps(dispatch) {
  return {
    query: (msg) => dispatch(apiCallStart(msg)),
    changeRoute: (url) => dispatch(push(url)),
  };
}

// get state
const mapStateToProps = createStructuredSelector({
  wsconn: selectWsConn(),
  session: selectSession(),
});

export default connect(mapStateToProps, mapDispatchToProps)(VmListPage);