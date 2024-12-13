import Statistics from "../components/Statistics.jsx";

const StatisticsPage = () => {
    return (
        <div className="main-content bg-none">
            <h1 className="text-4xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]">
                Estadísticas del taller
            </h1>
            <Statistics />
        </div>
    );
}

export default StatisticsPage;