import React from 'react';
import './index.less';
import LazyTable from '../lazy-table';

class UseTreeDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: this.getDataSource(),
      selectedRowKeys: ['11', '12'],
    };
  }

  getDataSource = () => {
    const arr = [];
    for (let i = 0; i < 10; i += 1) {
      arr.push({
        id: `1${i}`,
        name: `胡彦斌${i}`,
        age: i,
        address: `西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号${i}`,
        school: `杭州${i}`,
        gender: '男',
      });
    }
    return arr;
  };

  click = r => {
    console.log(r);
  };

  getColumns = () => {
    const me = this;
    return [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render(v, r) {
          return <input defaultValue={v} onClick={me.click.bind(me, r)} />;
        },
        renderTitle: (title, column) => {
          return (
            <span>
              {title}.{column.dataIndex}
              <span style={{ color: 'red' }}>*点</span>
            </span>
          );
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 48,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 200,
        renderTitle: title => {
          return (
            <span>
              {title}
              <span style={{ color: 'red' }}>*加</span>
            </span>
          );
        },
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
        width: 200,
        sorter: (a, b) => a.school.length - b.school.length,
      },
      {
        title: '学校',
        dataIndex: 'school',
        key: 'school',
        width: 200,
      },
    ];
  };

  handleOnChange = (pagination, filters, sorter, extra) => {
    console.log(pagination); // 不支持
    console.log(filters); // 不支持
    console.log(sorter); // 支持
    console.log(extra); // 不支持
    console.log('handleOnChange');
  };

  render() {
    const { dataSource, selectedRowKeys } = this.state;
    const rowSelection = {
      onChange: (s1, selectedRows) => {
        console.log(`selectedRowKeys: ${s1}`, 'selectedRows: ', selectedRows);
        this.setState({
          selectedRowKeys: s1,
        });
        console.log('onChange');
      },
      onSelect: (record, selected) => {
        console.log(record);
        console.log(selected);
        console.log('onSelect');
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected);
        console.log(selectedRows);
        console.log(changeRows);
        console.log('onSelectAll---');
      },
      selectedRowKeys,
      getCheckboxProps: record => ({
        disabled: record.age === 2 || record.age === 5, // Column configuration not to be checked
      }),
    };
    return (
      <div className="box">
        <LazyTable
          rowSelection={rowSelection}
          resetSort={false}
          onChange={this.handleOnChange}
          // loadingElement={<div>哈哈哈佳佳...</div>}
          loading={false}
          onCell={() => {
            return {};
          }}
          onRow={() => {
            return {};
          }}
          headerCellClassName="header-cell "
          rowCellClassName="cell"
          rowClassName={(record, index) => {
            if (index % 2 !== 0) {
              return 'row-bg';
            }
            return '';
          }}
          loadingTip="加载中..."
          rowHeight={40}
          dataSource={dataSource}
          columns={this.getColumns()}
          scroll={{ y: 325 }}
          rowKey="id"
          lazyLoading={false}
          onScrollBottom={() => {}}
          isResizeColumn
        />
      </div>
    );
  }
}

export default UseTreeDemo;
