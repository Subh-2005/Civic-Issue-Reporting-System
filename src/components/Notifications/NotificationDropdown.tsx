import { useState } from "react";
import { Bell, X, Check, Clock, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "unread" | "read";
  type: "info" | "warning" | "success" | "error";
}

// Dummy notification data
const dummyNotifications: Notification[] = [
  {
    id: "1",
    title: "New Issue Reported in Ward 5",
    description: "Road damage reported by Citizen John Smith on MG Road",
    timestamp: "2 hours ago",
    status: "unread",
    type: "warning"
  },
  {
    id: "2",
    title: "Issue Resolved - Street Light",
    description: "Street light repair completed on Park Avenue, Ward 3",
    timestamp: "4 hours ago",
    status: "unread",
    type: "success"
  },
  {
    id: "3",
    title: "Maintenance Scheduled",
    description: "Water supply maintenance scheduled for Ward 7 tomorrow",
    timestamp: "6 hours ago",
    status: "read",
    type: "info"
  },
  {
    id: "4",
    title: "Emergency Alert",
    description: "Traffic diversion on Highway due to construction work",
    timestamp: "1 day ago",
    status: "read",
    type: "error"
  },
  {
    id: "5",
    title: "Community Event",
    description: "Town hall meeting scheduled for next week",
    timestamp: "2 days ago",
    status: "read",
    type: "info"
  }
];

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [showAll, setShowAll] = useState(false);

  const unreadCount = notifications.filter(n => n.status === "unread").length;

  const toggleNotification = () => setIsOpen(!isOpen);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, status: "read" } : n)
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, status: "unread" } : n)
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <Button 
        size="sm" 
        variant="ghost" 
        className="relative hover:bg-muted/50 transition-colors"
        onClick={toggleNotification}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-destructive text-destructive-foreground flex items-center justify-center"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 z-50"
            >
              <div className="glass-effect rounded-lg border border-border shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Notifications List */}
                <ScrollArea className="max-h-96">
                  <div className="p-3 premium-scrollbar overflow-y-auto max-h-96 rounded-xl glass-effect shadow-lg">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-lg group cursor-pointer ${
                              notification.status === "unread" 
                                ? "bg-primary/10 border-primary/30" 
                                : "bg-muted/40 border-border"
                            }`}
                            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                {getTypeIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className={`text-sm font-medium truncate ${
                                    notification.status === "unread" 
                                      ? "text-foreground" 
                                      : "text-muted-foreground"
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      notification.status === "unread" 
                                        ? markAsRead(notification.id)
                                        : markAsUnread(notification.id);
                                    }}
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                  {notification.description}
                                </p>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {notification.timestamp}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="p-3 border-t border-border">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setShowAll(true)}
                  >
                    View All Notifications
                  </Button>
                </div>
      {/* Full notifications modal */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          >
            <div className="glass-effect rounded-xl border border-border shadow-2xl w-full max-w-lg mx-auto">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">All Notifications</h3>
                <Button size="sm" variant="ghost" onClick={() => setShowAll(false)} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="max-h-[70vh]">
                <div className="p-4 space-y-3">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md group cursor-pointer ${
                          notification.status === "unread"
                            ? "bg-primary/5 border-primary/20"
                            : "bg-muted/30 border-border"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {getTypeIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`text-sm font-medium truncate ${
                                notification.status === "unread"
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}>
                                {notification.title}
                              </h4>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  notification.status === "unread"
                                    ? markAsRead(notification.id)
                                    : markAsUnread(notification.id);
                                }}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {notification.description}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.timestamp}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};