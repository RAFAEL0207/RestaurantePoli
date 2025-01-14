"use client"
import React from 'react'
import Link from 'next/link'

import { Button } from '@nextui-org/react'
import { Add01Icon } from 'hugeicons-react'

export const CreateUserLink = () => {
    return (
        <Link href={`/admin/users/new`}>
            <Button
                as='div'
                startContent={<Add01Icon />}
                className="btn-primary"
            >
                Nuevo usuario
            </Button>
        </Link>
    )
}
