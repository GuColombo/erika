import { 
  Inbox, 
  Database, 
  FileText, 
  Search, 
  TrendingUp, 
  Settings,
  Activity,
  Info,
  FileSearch,
  Download,
  Upload,
  BarChart3
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useErika } from "@/contexts/ErikaContext";

interface AppSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const modules = [
  { id: 'dashboard', name: 'Dashboard', icon: BarChart3, description: 'System overview & analytics' },
  { id: 'inbox', name: 'Inbox', icon: Inbox, description: 'File ingestion & processing' },
  { id: 'memory', name: 'Memory', icon: Database, description: 'All indexed files & topics' },
  { id: 'digest', name: 'Digest View', icon: FileText, description: 'Summaries & insights' },
  { id: 'query', name: 'Query Terminal', icon: Search, description: 'Natural language queries' },
  { id: 'mckinsey', name: 'Consultant Mode', icon: TrendingUp, description: 'Strategic frameworks' },
  { id: 'inspector', name: 'File Inspector', icon: FileSearch, description: 'Detailed file analysis' },
];

export function AppSidebar({ activeModule, setActiveModule }: AppSidebarProps) {
  const { state } = useErika();
  const { files } = state;
  
  const processingCount = files.filter(f => f.status === 'processing').length;
  const errorCount = files.filter(f => f.status === 'error').length;

  return (
    <Sidebar className="sidebar-nav border-r border-sidebar-border" collapsible="offcanvas">
      <SidebarContent className="p-4">
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-caption-1 font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                
                return (
                  <SidebarMenuItem key={module.id}>
                    <SidebarMenuButton 
                      onClick={() => setActiveModule(module.id)}
                      className={`w-full justify-start h-12 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'sidebar-item-active shadow-sm' 
                          : 'sidebar-item-inactive'
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-callout font-medium truncate">{module.name}</span>
                            {module.id === 'inbox' && processingCount > 0 && (
                              <Badge variant="secondary" className="ml-2 h-5 text-xs">
                                {processingCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-caption-2 text-muted-foreground truncate">{module.description}</p>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}