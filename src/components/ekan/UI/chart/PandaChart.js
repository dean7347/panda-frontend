import React from 'react';
import Chart from "react-apexcharts";
import {pandaChartOptions} from "../../pages/mypage/panda/pandaTypes";

const PandaChart = ({series}) => {
    const data =
        {
            name: "ํ๋งค๋",
            data: series
        }
    return (
        <Chart
            options={{
                ...pandaChartOptions.options,
                theme: {mode: 'light'}
            }}
            series={[data]}
            type='line'
            height='100%'
        />
    );
};

export default PandaChart;
