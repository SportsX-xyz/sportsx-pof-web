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
      // Mock tags data
      const mockTags: Tag[] = [
        { id: 'sport-1', type: 'sport', name: 'Football', parent_id: null, created_at: new Date().toISOString() },
        { id: 'sport-2', type: 'sport', name: 'Basketball', parent_id: null, created_at: new Date().toISOString() },
        { id: 'sport-3', type: 'sport', name: 'Soccer', parent_id: null, created_at: new Date().toISOString() },
        { id: 'league-1', type: 'league', name: 'NFL', parent_id: 'sport-1', created_at: new Date().toISOString() },
        { id: 'league-2', type: 'league', name: 'NBA', parent_id: 'sport-2', created_at: new Date().toISOString() },
        { id: 'league-3', type: 'league', name: 'Premier League', parent_id: 'sport-3', created_at: new Date().toISOString() },
        { id: 'club-1', type: 'club', name: 'Patriots', parent_id: 'league-1', created_at: new Date().toISOString() },
        { id: 'club-2', type: 'club', name: 'Lakers', parent_id: 'league-2', created_at: new Date().toISOString() },
        { id: 'club-3', type: 'club', name: 'Arsenal', parent_id: 'league-3', created_at: new Date().toISOString() },
      ];

      setTags(mockTags);
    } catch (error) {
    }
  };

  const fetchUserTags = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Mock user tags data
      const mockUserTags: UserTag[] = [
        {
          user_id: user.id,
          tag_id: 'sport-3',
          created_at: new Date().toISOString(),
          tag: {
            id: 'sport-3',
            type: 'sport',
            name: 'Soccer',
            parent_id: null,
            created_at: new Date().toISOString(),
          },
        },
        {
          user_id: user.id,
          tag_id: 'league-3',
          created_at: new Date().toISOString(),
          tag: {
            id: 'league-3',
            type: 'league',
            name: 'Premier League',
            parent_id: 'sport-3',
            created_at: new Date().toISOString(),
          },
        },
        {
          user_id: user.id,
          tag_id: 'club-3',
          created_at: new Date().toISOString(),
          tag: {
            id: 'club-3',
            type: 'club',
            name: 'Arsenal',
            parent_id: 'league-3',
            created_at: new Date().toISOString(),
          },
        },
      ];

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