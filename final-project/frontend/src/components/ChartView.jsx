import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PIE_COLORS = ["#10b981", "#94a3b8"]; // green for done, slate for open

export default function ChartView({ quests, categories }) {
  // ----- Bar chart data: count quests per category -----
  // Start with one entry per category, count = 0
  const countsByCategory = categories.map((cat) => ({
    name: cat.name,
    count: 0,
  }));

  // Add an "Uncategorized" bucket for quests with no category
  countsByCategory.push({ name: "Uncategorized", count: 0 });

  // Walk the quests and increment the matching bucket
  quests.forEach((quest) => {
    const bucketName = quest.category ? quest.category.name : "Uncategorized";
    const bucket = countsByCategory.find((b) => b.name === bucketName);
    if (bucket) bucket.count += 1;
  });

  // ----- Pie chart data: completed vs. open -----
  const completedCount = quests.filter((q) => q.is_completed).length;
  const openCount = quests.length - completedCount;

  const completionData = [
    { name: "Done", value: completedCount },
    { name: "Open", value: openCount },
  ];

  if (quests.length === 0) {
    return (
      <div className="rounded border border-slate-200 bg-white p-6 text-slate-500">
        No data to chart yet. Create some quests first.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Bar chart card */}
      <div className="rounded border border-slate-200 bg-white p-4">
        <h2 className="mb-2 font-semibold">Quests by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={countsByCategory}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart card */}
      <div className="rounded border border-slate-200 bg-white p-4">
        <h2 className="mb-2 font-semibold">Completion Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={completionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {completionData.map((entry, index) => (
                <Cell key={index} fill={PIE_COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
