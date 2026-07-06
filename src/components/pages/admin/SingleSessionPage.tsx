"use client";

import { useEffect, useState } from "react";
import { ClassProps } from "@/lib/props";
import { fetchClasses } from "@/lib/api/class";
import { Add, DeleteForeverOutlined, ImportExport } from "@mui/icons-material";
import Button from "@/components/.ui/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

const SingleSessionPage = () => {
  return (
    <div className="admin-dash-page-container">
      <div>
        <Link href="/admin/sessions" className="back-link">
          <ArrowBackIcon className="back-arrow" /> All Sessions
        </Link>
      </div>
    </div>
  );
};

export default SingleSessionPage;