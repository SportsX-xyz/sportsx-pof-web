import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Medal, Users, Crown, ArrowUpDown } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useTags } from "@/hooks/useTags";

interface LeaderboardEntry {
  user_id: string;
  display_name?: string; // For public leaderboard
  email?: string; // Only for admin access
  first_name?: string | null; // Only for admin access
  last_name?: string | null; // Only for admin access
  country: string | null;
  total_points: number;
  checkin_streak: number;
  sport_name: string | null;
  league_name: string | null;
  club_name: string | null;
  badge_count: number;
  last_activity: string | null;
}

const columnHelper = createColumnHelper<LeaderboardEntry>();

export function Leaderboard() {
  const { leaderboard, loading, filters, setFilter, getUserRank } = useLeaderboard();
  const { getSportsByType } = useTags();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const sports = getSportsByType('sport');
  const leagues = filters.sport ? getSportsByType('league', filters.sport) : [];
  const clubs = filters.league ? getSportsByType('club', filters.league) : [];

  const columns = useMemo(() => [
    columnHelper.accessor((row, index) => index + 1, {
      id: 'rank',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 p-0 font-semibold"
        >
          Rank
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row }) => {
        const rank = getValue() as number;
        return (
          <div className="flex items-center gap-2">
            {rank === 1 && <Crown className="h-4 w-4 text-yellow-500" />}
            {rank === 2 && <Medal className="h-4 w-4 text-gray-400" />}
            {rank === 3 && <Medal className="h-4 w-4 text-orange-600" />}
            <span className="font-semibold">{rank}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor((row) => 
      row.display_name || 
      `${row.first_name || ''} ${row.last_name || ''}`.trim() || 
      row.email || 
      'Anonymous', 
    {
      id: 'name',
      header: 'Fan',
      cell: ({ getValue, row }) => (
        <div className="space-y-1">
          <div className="font-medium">{getValue()}</div>
          {row.original.country && (
            <div className="text-xs text-muted-foreground">{row.original.country}</div>
          )}
        </div>
      ),
    }),
    columnHelper.accessor('total_points', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 p-0 font-semibold"
        >
          <Trophy className="mr-2 h-4 w-4" />
          PoF Points
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => (
        <div className="text-right font-semibold">
          {getValue().toLocaleString()}
        </div>
      ),
    }),
    columnHelper.accessor('sport_name', {
      header: 'Sport',
      cell: ({ getValue }) => getValue() ? (
        <Badge variant="outline" className="text-xs">
          🏃‍♂️ {getValue()}
        </Badge>
      ) : <span className="text-muted-foreground">-</span>,
    }),
    columnHelper.accessor('league_name', {
      header: 'League',
      cell: ({ getValue }) => getValue() ? (
        <Badge variant="outline" className="text-xs">
          🏆 {getValue()}
        </Badge>
      ) : <span className="text-muted-foreground">-</span>,
    }),
    columnHelper.accessor('club_name', {
      header: 'Club',
      cell: ({ getValue }) => getValue() ? (
        <Badge variant="outline" className="text-xs">
          ⚽ {getValue()}
        </Badge>
      ) : <span className="text-muted-foreground">-</span>,
    }),
    columnHelper.accessor('checkin_streak', {
      header: 'Streak',
      cell: ({ getValue }) => (
        <div className="text-center">
          <Badge variant="secondary" className="text-xs">
            {getValue()} days
          </Badge>
        </div>
      ),
    }),
    columnHelper.accessor('badge_count', {
      header: 'Badges',
      cell: ({ getValue }) => (
        <div className="text-center">
          <Badge variant="default" className="text-xs">
            {getValue()} badges
          </Badge>
        </div>
      ),
    }),
  ], []);

  const table = useReactTable({
    data: leaderboard,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  const userRank = getUserRank();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Fan Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Rank Banner */}
      {userRank && (
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">Your Current Rank</div>
                  <div className="text-sm text-muted-foreground">
                    Out of {leaderboard.length} fans
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">
                #{userRank}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Fan Leaderboard
          </CardTitle>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={filters.sport || undefined} onValueChange={(value) => setFilter('sport', value || '')}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Sports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-sports">All Sports</SelectItem>
                {sports.map((sport) => (
                  <SelectItem key={sport.id} value={sport.name}>
                    🏃‍♂️ {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {filters.sport && (
              <Select value={filters.league || undefined} onValueChange={(value) => setFilter('league', value || '')}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Leagues" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-leagues">All Leagues</SelectItem>
                  {leagues.map((league) => (
                    <SelectItem key={league.id} value={league.name}>
                      🏆 {league.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {filters.league && (
              <Select value={filters.club || undefined} onValueChange={(value) => setFilter('club', value || '')}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Clubs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-clubs">All Clubs</SelectItem>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.name}>
                      ⚽ {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Select value={filters.limit.toString()} onValueChange={(value) => setFilter('limit', parseInt(value))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">Top 25</SelectItem>
                <SelectItem value="50">Top 50</SelectItem>
                <SelectItem value="100">Top 100</SelectItem>
                <SelectItem value="250">Top 250</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}