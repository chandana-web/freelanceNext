"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Rating,
  Button,
  Divider,
  Stack,
  Paper,
  Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,      
} from "@mui/material";
import { getFreelancerProfile } from "../../api/freelancerProfileApi";
import { postReviewReply} from "../../api/freelancerDashboardPro";

export default function ReviewsPage() {
  const freelancerId = "694a448042c8657b2105e7a1"; // fixed for now

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
const [replyText, setReplyText] = useState("");
const [activeCommentId, setActiveCommentId] = useState(null);
const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getFreelancerProfile(freelancerId);
        setData(res.data.profile);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <Typography sx={{ p: 4 }}>Loading...</Typography>;

  const handleOpen = (commentId) => {
  setActiveCommentId(commentId);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setReplyText("");
  setActiveCommentId(null);
};
const handleSubmitReply = async () => {
  if (!replyText.trim()) return;

  try {
    setSubmitting(true);

    await postReviewReply(activeCommentId, replyText);

    // Optimistic UI update
    setData((prev) => ({
      ...prev,
      comments: prev.comments.map((c) =>
        c._id === activeCommentId
          ? {
              ...c,
              freelancerReply: {
                message: replyText,
                repliedAt: new Date(),
              },
            }
          : c
      ),
    }));

    handleClose();
  } catch (err) {
    console.error("Reply failed", err);
    alert("Failed to submit reply");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <Box sx={{ px: 6, py: 4, bgcolor: "#f7f5f2" }}>
      {/* Header */}
      <Typography variant="h5" fontWeight={600}>
        Reviews
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Lorem ipsum dolor sit amet, consectetur.
      </Typography>

      {/* Tabs */}
      <Tabs value={0} sx={{ mb: 3 }}>
        <Tab label="Services" />
        <Tab label="Project" />
        <Tab label="Jobs" />
      </Tabs>

      {/* Reviews List */}
      <Paper elevation={0} sx={{ p: 3 }}>
        {data?.comments?.map((review, index) => (
          <Box key={review._id}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              {/* Avatar */}
              <Avatar
                sx={{
                  bgcolor: "#1b4332",
                  width: 44,
                  height: 44,
                }}
              >
                {review.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </Avatar>

              {/* Content */}
              <Box flex={1}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  mb={0.5}
                >
                  <Typography fontWeight={600}>
                    {review.name}
                  </Typography>

                  <Rating
                    value={review.rating}
                    readOnly
                    size="small"
                  />

                  <Typography variant="body2" fontWeight={600}>
                    {review.rating.toFixed(2)}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Published{" "}
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Stack>

                <Typography variant="body2" mb={2}>
                  {review.comment}
                </Typography>

                {/* Freelancer Reply */}
{review.freelancerReply?.message && (
  <Box
    sx={{
      bgcolor: "#f7f7f7",
      borderLeft: "3px solid #2e7d32",
      px: 2,
      py: 1.5,
      mb: 2,
      borderRadius: 1,
    }}
  >
    <Typography
      variant="body2"
      fontWeight={600}
      mb={0.5}
    >
      Freelancer Response
    </Typography>

    <Typography variant="body2">
      {review.freelancerReply.message}
    </Typography>
    

    {review.freelancerReply.repliedAt && (
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        mt={0.5}
      >
        {new Date(
          review.freelancerReply.repliedAt
        ).toLocaleDateString()}
      </Typography>
    )}
  </Box>
)}
{!review.freelancerReply?.message && (
  <Button
    variant="contained"
    sx={{
      textTransform: "none",
      bgcolor: "#fdece6",
      color: "#2e7d32",
      boxShadow: "none",
      "&:hover": {
        bgcolor: "#f9e0d8",
        boxShadow: "none",
      },
    }}
    onClick={() => handleOpen(review._id)}
  >
    Respond
  </Button>
)}
<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle>Reply to Review</DialogTitle>

  <DialogContent>
    <TextField
      multiline
      rows={4}
      fullWidth
      placeholder="Write your response..."
      value={replyText}
      onChange={(e) => setReplyText(e.target.value)}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button
      variant="contained"
      onClick={handleSubmitReply}
      disabled={submitting}
    >
      {submitting ? "Posting..." : "Post Reply"}
    </Button>
  </DialogActions>
</Dialog>

              </Box>
            </Stack>

            {index !== data.comments.length - 1 && (
              <Divider sx={{ my: 3 }} />
            )}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
