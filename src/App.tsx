import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";

import { Post, PostCard } from "./PostDetail";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json() as Promise<{ items: Post[] }>)
      .then((body) => setPosts(body.items));
  }, []);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {process.env.REACT_APP_SITE_NAME}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <MenuItem component={RouterLink} to="/">
              Home
            </MenuItem>
            <MenuItem component={RouterLink} to="/about">
              About
            </MenuItem>
            <MenuItem component={RouterLink} to="/posts/edit/new">
              New Post
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ marginTop: "1rem" }}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} to={`/posts/${post.id}`} />
        ))}
      </Container>
    </div>
  );
}

export default App;
