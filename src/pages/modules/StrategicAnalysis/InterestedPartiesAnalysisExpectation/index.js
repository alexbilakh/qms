import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Input, Table, Tooltip, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import axios from 'axios';

import {
  setList,
  loadInterestedPartiesAnalysisExpectations
} from "../../../../store/interestedPartiesAnalysisExpectationsSlice";
import InterestedPartiesAnalysisExpectationForm from "./Form";
import SideOverlap from "../../../../@components/SideOverlap";
import {
  DATETIME_DEFAULT_FORMAT
} from '../../../../services/config';

function InterestedPartiesAnalysisExpectation() {
  
  const columns = [
    {
      title: "Format",
      dataIndex: "format",
    },
    {
      title: "Revision",
      dataIndex: "revision",
    },
    {
      title: "Date",
      dataIndex: "revision_at",
      render: (createdAt) => moment(createdAt).format(DATETIME_DEFAULT_FORMAT),
    },
    {
      title: "CreatedBy",
      dataIndex: "creater",
      render:(creater) => {
        const firstName = creater?.first_name ?? '';
        const lastName = creater?.last_name ?? '';
        return firstName + '' + lastName;
      },
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (createdAt) => moment(createdAt).format(DATETIME_DEFAULT_FORMAT),
    },
    {
      title: "ApprovedBy",
      dataIndex: "approver",
      render: (approver) => {
        const firstName = approver?.first_name ?? '';
        const lastName = approver?.last_name ?? '';
        return firstName + '' + lastName;
      },
    },
    {
      title: "Modified",
      dataIndex: "updated_at",
      render: (updatedAt) => moment(updatedAt).format(DATETIME_DEFAULT_FORMAT),
    },
    {
      title: <div className="text-center">Action</div>,
      width: 100,
      render: (text, row, index) =>{
        return (
          <div className="text-center">
            {(index == 0 && interestedPartiesAnalysisExpectations.pagination.current == 1) ? 
              <Tooltip title="Edit">
                <Button
                  className="border-0 hover:bg-transparent"
                  icon={<FontAwesomeIcon icon={faPen} style={{color: '#acadad'}} />}
                  onClick={() => seteditingRow({id: row.id, editable: true})}
                />
              </Tooltip>
              : 
              <Tooltip title="Show">
                <Button
                  className="border-0 hover:bg-transparent"
                  icon={<FontAwesomeIcon icon={faEye} style={{color: '#acadad'}}/>}
                  onClick={() => seteditingRow({id: row.id, editable: false})}
                />
              </Tooltip>
            }
          </div>
      )},
    },
  ];

  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const interestedPartiesAnalysisExpectations = useSelector((state) => state.interestedPartiesAnalysisExpectations.list);
  const [loading, setLoading] = useState(false);

  const [editingRow, seteditingRow] = useState({
    id: -1,
    editable: false,
  });

  const handleTableFilterChange = async (searchVal, pagination) => {

    setLoading(true);
    await dispatch(
      loadInterestedPartiesAnalysisExpectations({
        searchVal,
        pageSize: pagination.pageSize,
        page: pagination.current
      })
    );
    setLoading(false);
    searchInputRef.current.focus();
  };


  const handleSearch = (value) => {
    dispatch(setList({ searchVal: value }))
    handleTableFilterChange(value, 1);
  }

  const handlePagenation = (pagination) => {
    handleTableFilterChange(interestedPartiesAnalysisExpectations.searchVal, pagination);
  }

  useEffect(() => {
    if (editingRow.id === -1) {
      handleTableFilterChange(
        interestedPartiesAnalysisExpectations.searchVal, 
        interestedPartiesAnalysisExpectations.pagination
      );
    }
  }, [editingRow]);

  return (
    <div style={{ minHeight: 360 }}>
      <div className="flex justify-between mb-2">
        <Input.Search
          placeholder="Search..."
          className="w-60"
          defaultValue={interestedPartiesAnalysisExpectations.searchVal}
          ref={searchInputRef}
          onSearch={handleSearch} />
        <Button
          type="primary"
          onClick={() => seteditingRow({id: null, editable: true})}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          Create
        </Button>
      </div>

      <Table
        columns={columns}
        pagination={interestedPartiesAnalysisExpectations.pagination}
        dataSource={interestedPartiesAnalysisExpectations.data}
        loading={loading}
        size="middle"
        onChange={(pagenation) => handlePagenation(pagenation)}
        rowKey={(row) => row.id}
      />

      {/* Start Form */}
      <SideOverlap
        open={editingRow.id !== -1}
        width="100%"
        showClose={true}
        onClose={() => {
          seteditingRow({id: -1, index: false});
        }}
      >
        <InterestedPartiesAnalysisExpectationForm
          row={editingRow}
          onSave={() => seteditingRow({id: -1, index: false})} />
      </SideOverlap>
      {/* End Form */}
    </div>
  );
}

export default InterestedPartiesAnalysisExpectation;
