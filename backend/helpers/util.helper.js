export function buildYoutubeStyleTree(flatRows) {
    const rootMap = {};

    // 1. Initialize structural map placeholders for Level 1 Root items
    flatRows.forEach(row => {
        if (row.current_depth === 1) {
            rootMap[row.CommentId] = {
                CommentId: row.CommentId,
                UserId: row.UserId,
                UserName: row.UserName,
                Comment: row.Comment,
                Likes: row.Likes,
                Dislikes: row.Dislikes,
                CreatedAt: row.CreatedAt,
                level:0,
                Replies: [] // Holds Level 2 items
            };
        }
    });

    // 2. Map Level 2 items and prepare them to hold Level 3 tagged sub-items
    const level2Map = {};
    flatRows.forEach(row => {
        if (row.current_depth === 2) {
            const rootComment = rootMap[row.root_id];
            if (rootComment) {
                const level2Item = {
                    CommentId: row.CommentId,
                    ParentCommentId: row.ParentCommentId,
                    UserId: row.UserId,
                    UserName: row.UserName,
                    Comment: row.Comment,
                    Likes: row.Likes,
                    Dislikes: row.Dislikes,
                    CreatedAt: row.CreatedAt,
                    level:1,
                    Replies: [] // Holds Level 3 items flatly grouped
                };
                rootComment.Replies.push(level2Item);
                level2Map[row.CommentId] = level2Item; // Map reference for depth 3 lookup
            }
        }
    });

    // 3. Place Level 3 elements inside their parent Tier 2 container with user tags
    flatRows.forEach(row => {
        if (row.current_depth === 3) {
            // Find the active Tier 2 parent container handling this nested cluster
            // If it is a direct reply to a depth 2 item, parent_id matches level2Map. 
            // If it's deeper, look up where it belongs in the conversation branch.
            let level2Parent = level2Map[row.ParentCommentId];
            
            // Fallback strategy if it's a reply to another depth 3 element
            if (!level2Parent) {
                const siblingRow = flatRows.find(r => r.CommentId === row.ParentCommentId);
                if (siblingRow) {
                    level2Parent = level2Map[siblingRow.ParentCommentId];
                }
            }

            if (level2Parent) {
                level2Parent.Replies.push({
                    CommentId: row.CommentId,
                    ParentCommentId: row.ParentCommentId,
                    UserId: row.UserId,
                    UserName: row.UserName,
                    reply_to_user_id: row.reply_to_user_id, // Front-end uses this to prepend '@username'
                    Comment: row.Comment,
                    Likes: row.Likes,
                    Dislikes: row.Dislikes,
                    CreatedAt: row.CreatedAt,
                    level:2
                });
            }
        }
    });

    return Object.values(rootMap);
}
