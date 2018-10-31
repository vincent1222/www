import React from 'react';
import {Radio, Table, Icon} from 'antd';

export default class Rank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: localStorage.getItem('rank') || 'meituan'
    };
  }

  render() {
    const {data} = this.props;
    (data.meituan || []).forEach((item, index) => (item.key = index));
    (data.ele || []).forEach((item, index) => (item.key = index));
    (data.eleYesterday || []).forEach((item, index) => (item.key = index));

    const columns = [
      {
        title: '排名',
        dataIndex: 'ranking',
        width: '33%',
        render: value =>
          ~~value < 4 ? (
            <Icon
              type="trophy"
              style={{
                fontSize: [0, 50, 40, 30][value],
                color: ['', 'rgb(242,192,86)', 'rgb(192,192,192)', 'rgb(186,110,64)'][value]
              }}
            />
          ) : (
            value
          )
      },
      {title: 'uid', dataIndex: 'userId', width: '33%'},
      {title: '贡献数量', dataIndex: 'count', width: '33%'}
    ];

    if (this.state.rank === 'eleYesterday') {
      columns.push({title: '今日赠送美团次数', dataIndex: 'number'});
      columns.forEach(column => (column.width = '25%'));
    }

    return (
      <div>
        <div style={{color: '#dd2323'}}>排行榜数据半小时更新一次</div>
        <div>饿了么昨日排名前N，今日赠送对应的美团次数</div>
        <div style={{marginTop: 15, paddingBottom: 15}}>
          贡献排行榜：
          <Radio.Group onChange={this.onChange} value={this.state.rank}>
            <Radio value="meituan">美团</Radio>
            <Radio value="ele">饿了么</Radio>
            <Radio value="eleYesterday">饿了么昨日</Radio>
          </Radio.Group>
        </div>
        <Table dataSource={data[this.state.rank]} columns={columns} pagination={false} />
      </div>
    );
  }

  onChange = e => {
    const rank = e.target.value;
    this.setState({rank});
    localStorage.setItem('rank', rank);
  };
}
