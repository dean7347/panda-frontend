import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Panel from "./Panel";
import { settlementSearchByStatus } from "../../pages/mypage/seller/sellerTypes";
import { setError } from "../../../../store/actions/pageActions";
import { fetchPandaSettlementList } from "../../../../store/actions/mypageActions/pandaActions";

const PandaSettlementPanel = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.page);
  const { pandaSettlementList } = useSelector((state) => state.panda);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchStatus, setSearchStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [startD, setStartD] = useState();
  const [startM, setStartM] = useState();
  const [startY, setStartY] = useState();
  const [endD, setEndD] = useState();
  const [endY, setEndY] = useState();
  const [endM, setEndM] = useState();

  //   //console.log("시작날짜 : ,", startDate, "끝나는 날짜 : ", endDate);
  //   //console.log("시작날짜 : ,", startDate, "끝나는 날짜 : ", endDate);
  //console.log(` 상태모드: ${searchStatus}`);

  useEffect(() => {
    if (pandaSettlementList) {
      setLoading(false);
    }
  }, [pandaSettlementList]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (error) {
      dispatch(setError(""));
    }
    setLoading(true);
    dispatch(
      fetchPandaSettlementList({ startDate, endDate, searchStatus }, () =>
        setLoading(false)
      )
    );
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setStartDate(new Date());
    setEndDate(new Date());
    setSearchStatus("all");
  };

  const clickHandlerStartD = (e) => {
    //console.log(e);
  };

  return (
    <>
      <Panel title="조회하기" className="is-danger">
        <form onSubmit={submitHandler}>
          <p className="panel-tabs" style={{ marginBottom: 0 }}>
            <a className="is-active">날짜로 조회하기</a>
          </p>
          {
            <>
              <div className="panel-block is-hidden-touch">
                <p className="my-auto ml-2 mr-6 has-text-grey">조회기간</p>
                <span className="mr-3">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </span>
                ~
                <span className="ml-3">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </span>
              </div>

              <div className="panel-block is-hidden-desktop">
                <p className="my-auto mr-5 has-text-grey"> 시작 날짜</p>
                <div>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="panel-block is-hidden-desktop">
                <p className="my-auto mr-5 has-text-grey">마지막 날짜</p>
                <div>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>

              <div className="panel-block">
                <p className="my-auto ml-2 mr-6 has-text-grey">정산상태</p>
                <div className="select mr-2">
                  <select
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                  >
                    {settlementSearchByStatus.map((data, index) => (
                      <option key={index} value={data.value}>
                        {data.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          }
          <div className="panel-block">
            <div className="mx-auto">
              <Button
                type="submit"
                className="is-danger is-outlined mr-2"
                text="검색하기"
                disabled={loading}
              />
              <Button onClick={clickHandler} className="ml-2" text="초기화" />
            </div>
          </div>
        </form>
      </Panel>
    </>
  );
};

export default PandaSettlementPanel;
