import React from "react";
import Head from "next/head";
import Router from "next/router";
import Error from "next/error";
import axios from "axios";
import _ from "lodash";
import produce from "immer";
import moment from "moment";
import { DatePicker } from "antd";

export default function Home(props) {
  if (props.error) {
    return <Error statusCode={500} title={props.error.message} />;
  }
  //if (props.data.faultInfo) {
  //  return <Error statusCode={500} title={props.data.faultInfo.message} />;
  //}

  const [list, setList] = React.useState([]);
  const [record, setRecord] = React.useState(0);
  const [recordDate, setRecordDate] = React.useState("");
  React.useEffect(() => {
    // for front-end test db
    let result = localStorage.getItem("diabetes-list");

    if (!result) {
      result = [];
    } else {
      try {
        result = JSON.parse(result);
      } catch (error) {
        result = [];
      }
    }
    setList(result);
  }, []);

  React.useEffect(() => {
    // for front-end test db
    localStorage.setItem("diabetes-list", JSON.stringify(list));
  }, [list]);

  // add 함수가 렌더가 일어날 때 마다 생성

  const addItem = React.useCallback(() => {
    const item = {
      id,
      record,
      recordDate,
    };
    setList([...list, item]);
    setRecord(0);
    setRecordDate("");
  }, [list, record, recordDate]);

  const removeItem = React.useCallback(
    (id) => {
      setList(_.reject(list, (item) => item.id === id));
    },
    [list]
  );

  const done = React.useCallback(
    (id) => {
      setList(
        produce(list, (draft) => {
          const target = list.find((item) => item.id === id);
          const index = list.indexOf(target);
          draft[index].isDone = !target.isDone;
        })
      );
    },
    [list]
  );

  const targetDt = moment().subtract(1, "day").format("YYYYMMDD");
  //props.targetDt = targetDt;

  return (
    <div>
      <Head>
        <title>Diabetes Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl font-bold">당뇨 체크</h1>
      <div>
        <DatePicker
          defaultValue={moment(targetDt, "YYYYMMDD")}
          //defaultValue={moment(props.targetDt, "YYYYMMDD")}
          dateFormat={"YYYYMMDD"}
          onChange={(date) =>
            date !== null
              ? Router.push("/?targetDt=" + date.format("YYYYMMDD"))
              : ""
          }
        />
        <input
          type="text"
          className="border p-1"
          //value={text}
          //onChange={(event) => setText(event.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          //onClick={addItem}
        >
          추가
        </button>
      </div>
      {/* 리스트 띄우기 */}
      <ul className="list-disc">
        <li></li>
        <input
          type="input"
          className="mr-2"
          //checked={!!item.isDone}
          //onChange={() => done(item.id)}
        />
        <span>데이터 수치</span>
        <button
          className="ml-2 text-xs text-red text-red-500"
          //onClick={() => removeItem(item.id)}
        >
          [삭제]
        </button>
      </ul>
    </div>
  );
}
