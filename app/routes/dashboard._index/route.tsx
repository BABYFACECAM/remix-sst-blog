import { Group } from "@mantine/core";
import classes from "./dashboard.module.css";
import { History, Home2, Logout, SwitchHorizontal } from "tabler-icons-react";
import { useState } from "react";

const data = [
  { link: "/dashboard", label: "Home", icon: Home2 },
  { label: "Recent Posts", icon: History, link: "/recent-posts" },
];

export default function Dashboard() {
  const [active, setActive] = useState("Home");

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke="1.5" />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <h1>A Dab of Gab</h1>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="/"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <SwitchHorizontal className={classes.linkIcon} stroke="1.5" />
          <span>Change account</span>
        </a>

        <a
          href="/logout"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <Logout className={classes.linkIcon} stroke="{1.5}" />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
