import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from './use-toast';

interface Tag {
  id: string;
  type: 'sport' | 'league' | 'club';
  name: string;
  parent_id: string | null;
  created_at: string;
}

interface UserTag {
  user_id: string;
  tag_id: string;
  created_at: string;
  tag?: Tag;
}

export function useTags() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tags, setTags] = useState<Tag[]>([]);
  const [userTags, setUserTags] = useState<UserTag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
    if (user) {
      fetchUserTags();
    }
  }, [user]);

  const fetchTags = async () => {
    try {
      setLoading(true);
      // Mock tags data with comprehensive sports, leagues, and clubs
      const mockTags: Tag[] = [
        // Sports
        { id: 'sport-1', type: 'sport', name: 'Basketball', parent_id: null, created_at: new Date().toISOString() },
        { id: 'sport-2', type: 'sport', name: 'Football', parent_id: null, created_at: new Date().toISOString() },
        { id: 'sport-3', type: 'sport', name: 'American Football', parent_id: null, created_at: new Date().toISOString() },
        { id: 'sport-4', type: 'sport', name: 'Baseball', parent_id: null, created_at: new Date().toISOString() },
        { id: 'sport-5', type: 'sport', name: 'Hockey', parent_id: null, created_at: new Date().toISOString() },
        
        // Basketball Leagues
        { id: 'league-1', type: 'league', name: 'NBA', parent_id: 'sport-1', created_at: new Date().toISOString() },
        { id: 'league-2', type: 'league', name: 'WNBA', parent_id: 'sport-1', created_at: new Date().toISOString() },
        { id: 'league-3', type: 'league', name: 'NCAA Basketball', parent_id: 'sport-1', created_at: new Date().toISOString() },
        
        // Football Leagues
        { id: 'league-4', type: 'league', name: 'Premier League', parent_id: 'sport-2', created_at: new Date().toISOString() },
        { id: 'league-5', type: 'league', name: 'La Liga', parent_id: 'sport-2', created_at: new Date().toISOString() },
        { id: 'league-6', type: 'league', name: 'Bundesliga', parent_id: 'sport-2', created_at: new Date().toISOString() },
        { id: 'league-7', type: 'league', name: 'Serie A', parent_id: 'sport-2', created_at: new Date().toISOString() },
        { id: 'league-8', type: 'league', name: 'Ligue 1', parent_id: 'sport-2', created_at: new Date().toISOString() },
        
        // American Football Leagues
        { id: 'league-9', type: 'league', name: 'NFL', parent_id: 'sport-3', created_at: new Date().toISOString() },
        { id: 'league-10', type: 'league', name: 'NCAA Football', parent_id: 'sport-3', created_at: new Date().toISOString() },
        
        // Baseball Leagues
        { id: 'league-11', type: 'league', name: 'MLB', parent_id: 'sport-4', created_at: new Date().toISOString() },
        { id: 'league-12', type: 'league', name: 'Minor League Baseball', parent_id: 'sport-4', created_at: new Date().toISOString() },
        
        // Hockey Leagues
        { id: 'league-13', type: 'league', name: 'NHL', parent_id: 'sport-5', created_at: new Date().toISOString() },
        { id: 'league-14', type: 'league', name: 'AHL', parent_id: 'sport-5', created_at: new Date().toISOString() },
        
        // NBA Clubs
        { id: 'club-1', type: 'club', name: 'Los Angeles Lakers', parent_id: 'league-1', created_at: new Date().toISOString() },
        { id: 'club-2', type: 'club', name: 'Golden State Warriors', parent_id: 'league-1', created_at: new Date().toISOString() },
        { id: 'club-3', type: 'club', name: 'Boston Celtics', parent_id: 'league-1', created_at: new Date().toISOString() },
        { id: 'club-4', type: 'club', name: 'Chicago Bulls', parent_id: 'league-1', created_at: new Date().toISOString() },
        { id: 'club-5', type: 'club', name: 'Miami Heat', parent_id: 'league-1', created_at: new Date().toISOString() },
        { id: 'club-6', type: 'club', name: 'Brooklyn Nets', parent_id: 'league-1', created_at: new Date().toISOString() },
        
        // Premier League Clubs
        { id: 'club-7', type: 'club', name: 'Manchester United', parent_id: 'league-4', created_at: new Date().toISOString() },
        { id: 'club-8', type: 'club', name: 'Liverpool', parent_id: 'league-4', created_at: new Date().toISOString() },
        { id: 'club-9', type: 'club', name: 'Arsenal', parent_id: 'league-4', created_at: new Date().toISOString() },
        { id: 'club-10', type: 'club', name: 'Chelsea', parent_id: 'league-4', created_at: new Date().toISOString() },
        { id: 'club-11', type: 'club', name: 'Manchester City', parent_id: 'league-4', created_at: new Date().toISOString() },
        { id: 'club-12', type: 'club', name: 'Tottenham Hotspur', parent_id: 'league-4', created_at: new Date().toISOString() },
        
        // La Liga Clubs
        { id: 'club-13', type: 'club', name: 'Real Madrid', parent_id: 'league-5', created_at: new Date().toISOString() },
        { id: 'club-14', type: 'club', name: 'Barcelona', parent_id: 'league-5', created_at: new Date().toISOString() },
        { id: 'club-15', type: 'club', name: 'Atletico Madrid', parent_id: 'league-5', created_at: new Date().toISOString() },
        { id: 'club-16', type: 'club', name: 'Sevilla', parent_id: 'league-5', created_at: new Date().toISOString() },
        
        // NFL Clubs
        { id: 'club-17', type: 'club', name: 'New England Patriots', parent_id: 'league-9', created_at: new Date().toISOString() },
        { id: 'club-18', type: 'club', name: 'Kansas City Chiefs', parent_id: 'league-9', created_at: new Date().toISOString() },
        { id: 'club-19', type: 'club', name: 'Green Bay Packers', parent_id: 'league-9', created_at: new Date().toISOString() },
        { id: 'club-20', type: 'club', name: 'Dallas Cowboys', parent_id: 'league-9', created_at: new Date().toISOString() },
        { id: 'club-21', type: 'club', name: 'Pittsburgh Steelers', parent_id: 'league-9', created_at: new Date().toISOString() },
        { id: 'club-22', type: 'club', name: 'Buffalo Bills', parent_id: 'league-9', created_at: new Date().toISOString() },
        
        // MLB Clubs
        { id: 'club-23', type: 'club', name: 'New York Yankees', parent_id: 'league-11', created_at: new Date().toISOString() },
        { id: 'club-24', type: 'club', name: 'Los Angeles Dodgers', parent_id: 'league-11', created_at: new Date().toISOString() },
        { id: 'club-25', type: 'club', name: 'Boston Red Sox', parent_id: 'league-11', created_at: new Date().toISOString() },
        { id: 'club-26', type: 'club', name: 'San Francisco Giants', parent_id: 'league-11', created_at: new Date().toISOString() },
        { id: 'club-27', type: 'club', name: 'St. Louis Cardinals', parent_id: 'league-11', created_at: new Date().toISOString() },
        { id: 'club-28', type: 'club', name: 'Chicago Cubs', parent_id: 'league-11', created_at: new Date().toISOString() },
        
        // NHL Clubs
        { id: 'club-29', type: 'club', name: 'Boston Bruins', parent_id: 'league-13', created_at: new Date().toISOString() },
        { id: 'club-30', type: 'club', name: 'New York Rangers', parent_id: 'league-13', created_at: new Date().toISOString() },
        { id: 'club-31', type: 'club', name: 'Toronto Maple Leafs', parent_id: 'league-13', created_at: new Date().toISOString() },
        { id: 'club-32', type: 'club', name: 'Montreal Canadiens', parent_id: 'league-13', created_at: new Date().toISOString() },
        { id: 'club-33', type: 'club', name: 'Chicago Blackhawks', parent_id: 'league-13', created_at: new Date().toISOString() },
        { id: 'club-34', type: 'club', name: 'Detroit Red Wings', parent_id: 'league-13', created_at: new Date().toISOString() },
      ];

      setTags(mockTags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTags = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Mock user tags data - start with empty array for new users
      const mockUserTags: UserTag[] = [];

      setUserTags(mockUserTags);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const addUserTag = async (tagId: string) => {
    if (!user) return;

    try {
      // Mock adding user tag
      const tag = tags.find(t => t.id === tagId);
      if (tag) {
        const newUserTag: UserTag = {
          user_id: user.id,
          tag_id: tagId,
          created_at: new Date().toISOString(),
          tag: tag,
        };

        setUserTags(prev => [...prev, newUserTag]);
        
        toast({
          title: "Tag Added!",
          description: `Added ${tag.name} to your profile`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tag. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeUserTag = async (tagId: string) => {
    if (!user) return;

    try {
      // Mock removing user tag
      setUserTags(prev => prev.filter(ut => ut.tag_id !== tagId));
      
      const tag = tags.find(t => t.id === tagId);
      toast({
        title: "Tag Removed",
        description: `Removed ${tag?.name} from your profile`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove tag. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getTagsByType = (type: string, parentId?: string) => {
    return tags.filter(tag => 
      tag.type === type && 
      (parentId ? tag.parent_id === parentId : tag.parent_id === null)
    );
  };

  const getUserTagsByType = (type: string) => {
    return userTags.filter(userTag => userTag.tag?.type === type);
  };

  const getSportsByType = (type: 'sport' | 'league' | 'club', parentId?: string) => {
    return tags.filter(tag => 
      tag.type === type && 
      (parentId ? tag.parent_id === parentId : tag.parent_id === null)
    );
  };

  const getUserSport = () => {
    const sportTags = getUserTagsByType('sport');
    return sportTags.length > 0 ? sportTags[0].tag : null;
  };

  const getUserLeague = () => {
    const leagueTags = getUserTagsByType('league');
    return leagueTags.length > 0 ? leagueTags[0].tag : null;
  };

  const getUserClub = () => {
    const clubTags = getUserTagsByType('club');
    return clubTags.length > 0 ? clubTags[0].tag : null;
  };

  const getUserTagHierarchy = () => {
    const sportTags = getUserTagsByType('sport');
    const leagueTags = getUserTagsByType('league');
    const clubTags = getUserTagsByType('club');

    return {
      sports: sportTags,
      leagues: leagueTags,
      clubs: clubTags,
    };
  };

  return {
    allTags: tags,
    userTags,
    loading,
    addUserTag,
    removeUserTag,
    getTagsByType,
    getSportsByType,
    getUserTagsByType,
    getUserSport,
    getUserLeague,
    getUserClub,
    getUserTagHierarchy,
    refetch: fetchUserTags,
  };
}