




import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { useGetMonthlyTargets } from '../../goals/hook/useGoals';

/* function prepareChartData(data) {
    const filteredData = data.filter(item => item.target_id === 3); // Filter for target_id: 3

    if (filteredData.length === 0) {
        return null; // Handle empty data case (optional)
    }

    const categories = filteredData.map(item => item.month.split(' ')[0]); // Extract months
    const teamAData = filteredData.map(item => parseFloat(item.target_planificado)); // Target data
    const teamBData = filteredData.map(item => parseFloat(item.target_reportado)); // Reported data

    return {
        categories,
        series: [
            { name: "Team A (Planificado)", data: teamAData },
            { name: "Team B (Reportado)", data: teamBData },
        ],
    };
} */


export default function MonthlyTargetsAnalytics() {
/*     const { data } = useGetMonthlyTargets();
    const chartData = prepareChartData(data);

    if (!chartData) {
        return <p>No data found for target_id: 3.</p>;
    }  */
    return (
        <AnalyticsWebsiteVisits
            title="Metas Mensuales "
            subheader="(+43%) than last year"
            chart={{
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                ],
                series: [
                    { name: "Team A", data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                    { name: "Team B", data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
                ],
            }}
        />)
}   
