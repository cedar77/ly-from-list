import React, {Component} from 'react';
import {Button, Card, Col, Form, Icon, Row} from 'antd';
import {formLayout} from './formListGrid';

/**
 * 交易信息查询表单
 * @class FormList
 * @extends React.Component
 */

const FormList = WrappedComponent => class extends Component {
  /**
   * 改变post 值s
   * **/
  static postChange(values) {
    const value = [11, 22];
    value[0] = values;
    return value;
  }

  constructor(props) {
    super(props);
    const t = this;
    t.state = {
      expand: '1',
      showButton: true
    };
    t.handleReset = t.handleReset.bind(t);
    t.toggle = t.toggle.bind(t);
  }

  /**
   * 初始化 button
   * @module formButtonLayout
   * @return button html
   * **/
  formButtonLayout() {
    const t = this;
    const children = [];
    children.push(
      <Button icon="search" htmlType="submit" type="primary" size="large" onClick={()=>t.handleSubmit()}>查询</Button>
    );
    children.push(
      <Button icon="sync" size="large" onClick={t.handleReset}>重置</Button>
    );
    return children;
  }

  formExpandButton() {
    const t = this;
    return <a style={{marginLeft: 8, fontSize: 12}} onClick={t.toggle}>
      全部 <Icon type={this.state.expand === '1' ? 'up' : 'down'}/>
    </a>
  }

  /**
   * 显示全部按钮
   * @module toggle
   * **/
  toggle() {
    const t = this;
    t.setState({expand: t.state.expand === '1' ? '2' : '1'});
  }

  /**
   * 提交查询
   * @module handleSubmit
   * **/
  handleSubmit = (e) => {
    //alert(111)
    const t = this;
    //e.preventDefault();
    t.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const val = FormList.postChange(values); //参数修改
        t.props.submit(val, 1);
        t.setState({
          expand: '0'
        });
      } else {
        console.log(err);
      }
    });

  }

  /**
   * 重置表格
   * @module handleReset
   * **/
  handleReset() {
    const t = this;
    t.props.form.resetFields();
  }


  render() {
    const t = this;
    //const count = t.getFields() ? t.getFields().length : 0;
    // const handleHide = t.state.expand ? 'default-form show-form' : 'default-form';
    const handleHide = (() => {
      switch (t.state.expand) {
        case '1' :
          return 'show-form';
        case '2':
          return 'default-form';
        case '0' :
          return 'hidden-form';
        default:
          return 'show-form';
      }
    })();
    const expandStyle = {
      float: 'left',
      lineHeight: '32px'
    }
    //const formExpandButtonBody = (count > 6 || t.state.expand === '0') ? t.formExpandButton() : '';
    const formExpandButtonBody = '';
    const props = {
      ...this.props,
      handleSubmit:this.handleSubmit
    }
    return (
      <Card bordered={false} noHovering className="rsFormList" bodyStyle={{padding: 0}}>
        <Form>
          <Row className={handleHide} gutter={formLayout.gutter}><WrappedComponent text={333} {...props}/></Row>
          <Row type="flex" justify="center">
            <Col>
              <div className="form-button-layout" style={expandStyle}>{t.formButtonLayout()}</div>
              <div style={expandStyle}>{formExpandButtonBody}</div>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

export default FormList;
