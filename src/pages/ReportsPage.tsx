import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, CheckCircle, Clock, XCircle, Filter } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { mockReports } from '@/data/mockData';
import { Report } from '@/types';

const ReportsPage = () => {
  const [reports] = useState<Report[]>(mockReports);
  const [filterType, setFilterType] = useState<string>('All');

  const reportTypes = ['All', 'Compliance', 'Analytics', 'Audit', 'Summary'];

  const filteredReports = filterType === 'All' 
    ? reports 
    : reports.filter(r => r.type === filterType);

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'Generated':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'Failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const handleDownload = (report: Report) => {
    // Simulate download
    const content = `
PRITHVI-NET Report
==================
Title: ${report.title}
Type: ${report.type}
Date: ${report.date}
Status: ${report.status}

This is a sample report content for demonstration purposes.
In production, this would contain actual environmental data and analysis.
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '_')}.txt`;
    a.click();
  };

  // Historical comparison data
  const historicalData = [
    { period: 'Q4 2025', avgAqi: 142, compliance: 78 },
    { period: 'Q3 2025', avgAqi: 128, compliance: 82 },
    { period: 'Q2 2025', avgAqi: 115, compliance: 85 },
    { period: 'Q1 2025', avgAqi: 135, compliance: 80 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Reports & Compliance Center</h1>
          <p className="text-muted-foreground">Access environmental reports and compliance documentation</p>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-flat p-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by Type:</span>
            </div>
            <div className="flex gap-2">
              {reportTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    filterType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Reports Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">Available Reports</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-sm font-medium">Report Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-border last:border-b-0 hover:bg-muted/30">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{report.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm bg-muted px-2 py-1">{report.type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(report.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(report.status)}
                      <span className="text-sm">{report.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {report.status === 'Generated' && (
                      <button
                        onClick={() => handleDownload(report)}
                        className="btn-outline text-sm px-3 py-1 flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    )}
                    {report.status === 'Pending' && (
                      <span className="text-sm text-muted-foreground">Processing...</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Historical Comparisons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-elevated"
        >
          <h2 className="font-semibold mb-4">Historical Comparisons</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Period</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Average AQI</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Compliance Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Trend</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.map((data, index) => (
                  <tr key={data.period} className="border-b border-border last:border-b-0">
                    <td className="py-3 px-4 font-medium">{data.period}</td>
                    <td className="py-3 px-4">{data.avgAqi}</td>
                    <td className="py-3 px-4">{data.compliance}%</td>
                    <td className="py-3 px-4">
                      {index < historicalData.length - 1 && (
                        <span className={
                          data.avgAqi < historicalData[index + 1].avgAqi 
                            ? 'text-success' 
                            : 'text-destructive'
                        }>
                          {data.avgAqi < historicalData[index + 1].avgAqi ? 'Improved' : 'Declined'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Compliance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated"
        >
          <h2 className="font-semibold mb-4">Compliance Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-success/10 border border-success/20">
              <p className="text-sm text-muted-foreground mb-1">Compliant Parameters</p>
              <p className="text-2xl font-semibold text-success">12 / 15</p>
            </div>
            <div className="p-4 bg-warning/10 border border-warning/20">
              <p className="text-sm text-muted-foreground mb-1">Warnings</p>
              <p className="text-2xl font-semibold text-warning">2</p>
            </div>
            <div className="p-4 bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-muted-foreground mb-1">Violations</p>
              <p className="text-2xl font-semibold text-destructive">1</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ReportsPage;
