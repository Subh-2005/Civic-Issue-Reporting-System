import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Archive,
  Sparkles,
  Zap,
} from "lucide-react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

// Stats Data
const stats = [
  {
    title: "Total Issues",
    value: "1,247",
    change: "+12%",
    icon: AlertCircle,
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
    color: "text-blue-600",
  },
  {
    title: "Active Users",
    value: "892",
    change: "+8%",
    icon: Users,
    bgColor: "bg-gradient-to-br from-green-100 to-green-50",
    color: "text-green-600",
  },
  {
    title: "Resolved Today",
    value: "34",
    change: "+25%",
    icon: CheckCircle,
    bgColor: "bg-gradient-to-br from-purple-100 to-purple-50",
    color: "text-purple-600",
  },
  {
    title: "Avg Response",
    value: "2.3h",
    change: "-15%",
    icon: Clock,
    bgColor: "bg-gradient-to-br from-orange-100 to-orange-50",
    color: "text-orange-600",
  },
];

// Issues Data
const initialIssues = [
  {
    id: "ISS-001",
    title: "Broken street light near Ram Mandir Square",
    description:
      "Bhai, e street light ta 3 din dhari bandh achhi. Rati bele loka mane chalibaku bhaya laguchi, safety khatra heuchhi.",
    location: "Ram Mandir Square, Bhubaneswar",
    category: "Infrastructure",
    priority: "High",
    status: "In Progress",
    citizenName: "Satyajit Das",
  },
  {
    id: "ISS-002",
    title: "Bada pothole near Master Canteen Bus Stop",
    description:
      "Master Canteen bus stop re gote bada pothole heichi. Gadi mane phasi jauchhi, jam o gadi damage heuchhi.",
    location: "Master Canteen, Bhubaneswar",
    category: "Road",
    priority: "Critical",
    status: "Pending",
    citizenName: "Subhasmita Nayak",
  },
  {
    id: "ISS-003",
    title: "Garbage pile up in Saheed Nagar Lane-4",
    description:
      "2 din dhari garbage uthai nahanti. Smell bahut kharap heijauchi, mosquito bhi baruchi.",
    location: "Saheed Nagar, Lane-4, Bhubaneswar",
    category: "Sanitation",
    priority: "Medium",
    status: "Resolved",
    citizenName: "Rakesh Pradhan",
  },
  {
    id: "ISS-004",
    title: "Water leakage inside Ekamra Kanan Park",
    description:
      "Pipe burst hei flooding heigala park bhitare. Bahut paani waste heuchhi, loka mane asubidha face karuchhanti.",
    location: "Ekamra Kanan, Nayapalli, Bhubaneswar",
    category: "Water",
    priority: "High",
    status: "In Progress",
    citizenName: "Ananya Mohanty",
  },
  {
    id: "ISS-005",
    title: "Night construction noise near KIIT Square",
    description:
      "Patia re rati 12 ta pare bhi construction choluchhi. Awaj bahut disturbing, student mane nidra pauchhanti nahi.",
    location: "KIIT Square, Patia, Bhubaneswar",
    category: "Environment",
    priority: "Low",
    status: "Pending",
    citizenName: "Debasish Rout",
  },
];

// Quick Actions Definitions with Details
const quickActions = [
  {
    label: "Create New Issue",
    icon: AlertCircle,
    color: "from-red-500 to-pink-500",
    description:
      "Submit a new civic issue to the dashboard and track its resolution progress.",
    details:
      "Use this action to log infrastructure problems, safety hazards, or complaints. Fill out the core details and assign a priority based on urgency.",
  },
  {
    label: "Manage Users",
    icon: Users,
    color: "from-blue-500 to-indigo-500",
    description:
      "Administer user accounts, roles, and permissions across the platform.",
    details:
      "Add, edit, or remove users. Assign different privileges such as admin, operator, or viewer as required for proper access control.",
  },
  {
    label: "View Map",
    icon: MapPin,
    color: "from-green-500 to-emerald-500",
    description: "Visualize reported issues on a city-wide or localized map.",
    details:
      "Explore issue density, filter by category, and click markers for more details. The map is interactive and updates automatically with each new report.",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    color: "from-purple-500 to-violet-500",
    description:
      "See key statistics, charts, and insights about issue trends and resolution performance.",
    details:
      "Review performance metrics such as resolution rate, response time, active issues, and trend analysis by category or region.",
  },
  {
    label: "Archived Issues",
    icon: Archive,
    color: "from-orange-500 to-amber-500",
    description:
      "Browse previously resolved or closed issues for future reference.",
    details:
      "Access historical civic issue data, download reports, and analyze closure rates. Supports search and filtering for archived records.",
  },
];

// Glassmorphism Animated Background
const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-3xl animate-pulse"></div>
    <div
      className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-pink-400/20 to-orange-500/20 blur-3xl animate-pulse"
      style={{ animationDelay: "2s" }}
    ></div>
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 blur-3xl animate-pulse"
      style={{ animationDelay: "4s" }}
    ></div>
  </div>
);

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "bg-gradient-to-r from-red-100 to-red-50 text-red-700 border-red-300";
    case "High":
      return "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 border-orange-300";
    case "Medium":
      return "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 border-yellow-200";
    case "Low":
      return "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200";
    default:
      return "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border-gray-300";
  }
};
const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 border-orange-200";
    case "In Progress":
      return "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border-blue-200";
    case "Resolved":
      return "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200";
    default:
      return "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border-gray-300";
  }
};
const getPriorityEmoji = (priority: string) =>
  ({
    Critical: "🚨",
    High: "⚠️",
    Medium: "📋",
    Low: "✅",
  }[priority] || "📋");
const getStatusEmoji = (status: string) =>
  ({
    Pending: "⏳",
    "In Progress": "🔄",
    Resolved: "✅",
  }[status] || "⏳");

const AdminDashboard = () => {
  const [allIssues, setAllIssues] = useState(initialIssues);
  const [filteredIssues, setFilteredIssues] = useState(initialIssues);
  const [visibleCount, setVisibleCount] = useState(5);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIssue, setEditingIssue] = useState<any>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // State for action modal
  const [activeAction, setActiveAction] = useState<number | null>(null);

  useEffect(() => {
    setFilteredIssues(allIssues);
  }, [allIssues]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredIssues(allIssues);
      return;
    }
    const filtered = allIssues.filter(
      (issue) =>
        issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIssues(filtered);
  };

  const handleDropdownFilter = () => {
    let filtered = allIssues;
    if (selectedPriority) {
      filtered = filtered.filter(
        (issue) => issue.priority === selectedPriority
      );
    }
    if (selectedStatus) {
      filtered = filtered.filter((issue) => issue.status === selectedStatus);
    }
    setFilteredIssues(filtered);
    setShowFilterDropdown(false);
  };

  const clearFilters = () => {
    setFilteredIssues(allIssues);
    setSelectedPriority("");
    setSelectedStatus("");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      <AnimatedBackground />
      <Header />
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Civic issue tracking with smart data and engaging visuals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <Card
                className={`relative overflow-hidden backdrop-blur-xl bg-white/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500`}
              >
                <CardContent className="p-8 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                        {stat.title}
                      </p>
                      <motion.p
                        className="text-3xl font-bold text-gray-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.15 }}
                      >
                        {stat.value}
                      </motion.p>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-600">
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Animated Recent Issues */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl mb-8">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Recent Issues
                  </CardTitle>
                </div>
                <div className="flex gap-3 relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 border-2 hover:border-blue-400"
                    onClick={() => setShowFilterDropdown((prev) => !prev)}
                  >
                    <Filter className="w-4 h-4 mr-2" /> 🎯 Filter
                  </Button>
                  <AnimatePresence>
                    {showFilterDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg p-4 z-10 flex flex-col gap-4"
                      >
                        <select
                          className="w-full border rounded p-2 mb-2"
                          value={selectedPriority}
                          onChange={(e) => setSelectedPriority(e.target.value)}
                        >
                          <option value="">Select Priority</option>
                          <option>Critical</option>
                          <option>High</option>
                          <option>Medium</option>
                          <option>Low</option>
                        </select>
                        <select
                          className="w-full border rounded p-2"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option>In Progress</option>
                          <option>Pending</option>
                          <option>Resolved</option>
                        </select>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDropdownFilter}
                          >
                            Apply Filter
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowFilterDropdown(false)}
                          >
                            Close
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSearch((p) => !p)}
                    className="hover:scale-105 border-2 hover:border-green-400"
                  >
                    <Search className="w-4 h-4 mr-2" /> 🔍 Search
                  </Button>
                </div>
              </div>
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
                  >
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="🔍 Search by ID, title, or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
                      />
                      <Button
                        onClick={handleSearch}
                        className="px-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 hover:scale-105"
                      >
                        Go
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-3 mt-6 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="hover:shadow-md"
                >
                  🧹 Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredIssues.slice(0, visibleCount).map((issue, index) => (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group relative overflow-hidden p-6 rounded-2xl border backdrop-blur-sm bg-white/60 hover:bg-white/80 hover:shadow-xl transition-all duration-500"
                    >
                      <div className="relative z-10 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="font-mono text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {issue.id}
                            </span>
                            <Badge
                              className={`${getPriorityColor(
                                issue.priority
                              )} font-semibold px-3 py-1`}
                            >
                              {getPriorityEmoji(issue.priority)}{" "}
                              {issue.priority}
                            </Badge>
                            <Badge
                              className={`${getStatusColor(
                                issue.status
                              )} font-semibold px-3 py-1`}
                            >
                              {getStatusEmoji(issue.status)} {issue.status}
                            </Badge>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-blue-600 transition-colors duration-300">
                            {issue.title}
                          </h4>
                          <div className="flex gap-3 mb-3">
                            <span className="text-xs bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 font-medium">
                              📂 {issue.category}
                            </span>
                            <span className="text-xs bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200 font-medium">
                              ⚡ {issue.priority}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 mr-2 text-red-500" />
                            <span className="font-medium">
                              {issue.location}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
                            {issue.description}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-blue-100 hover:text-blue-600"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingIssue(issue)}
                            className="hover:bg-green-100 hover:text-green-600"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-purple-100 hover:text-purple-600"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {visibleCount < filteredIssues.length && (
                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setVisibleCount((prev) => prev + 5)}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 hover:from-blue-600 hover:to-indigo-600 hover:scale-105"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Load More Issues
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center gap-3">
                Quick Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                >
                  <Button
                    className={`w-full justify-start p-4 h-auto bg-gradient-to-r ${action.color} hover:shadow-lg text-white`}
                    onClick={() => setActiveAction(i)}
                  >
                    <action.icon className="w-5 h-5 mr-3" />
                    <span className="font-semibold">{action.label}</span>
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Description Modal */}
        <AnimatePresence>
          {activeAction !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  {activeAction !== null &&
                    (() => {
                      const ActionIcon = quickActions[activeAction].icon;
                      return (
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${quickActions[activeAction].color}`}
                        >
                          <ActionIcon className="w-6 h-6 text-white" />
                        </div>
                      );
                    })()}
                  <h3 className="text-xl font-bold text-gray-900">
                    {quickActions[activeAction].label}
                  </h3>
                </div>
                <div className="mb-4">
                  <p className="text-lg text-gray-700 font-semibold mb-2">
                    {quickActions[activeAction].description}
                  </p>
                  <p className="text-sm text-gray-600">
                    {quickActions[activeAction].details}
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setActiveAction(null)}
                    className="px-6 py-2 hover:bg-gray-100"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Edit Issue Modal */}
      <AnimatePresence>
        {editingIssue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500">
                  <Edit className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Edit Issue {editingIssue.id}
                </h3>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingIssue.title}
                  onChange={(e) =>
                    setEditingIssue({ ...editingIssue, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                />
                <select
                  value={editingIssue.priority}
                  onChange={(e) =>
                    setEditingIssue({
                      ...editingIssue,
                      priority: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                >
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <select
                  value={editingIssue.status}
                  onChange={(e) =>
                    setEditingIssue({ ...editingIssue, status: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                >
                  <option>In Progress</option>
                  <option>Pending</option>
                  <option>Resolved</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <Button
                  onClick={() => setEditingIssue(null)}
                  variant="outline"
                  className="px-6 py-2 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setAllIssues((prev) =>
                      prev.map((i) =>
                        i.id === editingIssue.id ? editingIssue : i
                      )
                    );
                    setFilteredIssues((prev) =>
                      prev.map((i) =>
                        i.id === editingIssue.id ? editingIssue : i
                      )
                    );
                    setEditingIssue(null);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
