import { Heading, Text, StatusBadge } from '@/ui/components/atoms';
import { SearchBar, FilterDropdown } from '@/ui/components/molecules';

interface FilterOption {
  label: string;
  value: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  showFilters?: boolean;
  filterOptions?: FilterOption[];
  onFilter?: (value: string) => void;
  filterPlaceholder?: string;
  badges?: Array<{
    variant: 'featured' | 'new' | 'popular' | 'exclusive' | 'casino';
    text: string;
  }>;
  backgroundGradient?: string;
}

export default function PageHeader({
  title,
  subtitle,
  showSearch = false,
  searchPlaceholder = "Поиск...",
  onSearch,
  showFilters = false,
  filterOptions = [],
  onFilter,
  filterPlaceholder = "Фильтр",
  badges = [],
  backgroundGradient = "from-blue-900 via-purple-900 to-blue-800"
}: PageHeaderProps) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${backgroundGradient}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="relative container mx-auto px-4 py-12 lg:py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex justify-center gap-3 mb-6">
              {badges.map((badge, index) => (
                <StatusBadge key={index} variant={badge.variant} size="md">
                  {badge.text}
                </StatusBadge>
              ))}
            </div>
          )}

          {/* Title */}
          <Heading 
            as="h1" 
            size="4xl" 
            className="text-white font-bold mb-4 leading-tight"
          >
            {title}
          </Heading>
          
          {/* Subtitle */}
          {subtitle && (
            <Text 
              size="lg" 
              className="text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </Text>
          )}

          {/* Search and Filters */}
          {(showSearch || showFilters) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              {showSearch && onSearch && (
                <div className="w-full sm:flex-1">
                  <SearchBar
                    placeholder={searchPlaceholder}
                    onSearch={onSearch}
                    size="lg"
                  />
                </div>
              )}
              
              {showFilters && onFilter && filterOptions.length > 0 && (
                <div className="w-full sm:w-auto min-w-[200px]">
                  <FilterDropdown
                    options={filterOptions}
                    onSelectionChange={(values) => onFilter?.(values[0] || '')}
                    placeholder={filterPlaceholder}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 