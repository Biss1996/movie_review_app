"""Manually drop is_hidden from reviews

Revision ID: 39f35a95f303
Revises: 21f13cda43d3
Create Date: 2025-06-21 15:28:34.434877

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '39f35a95f303'
down_revision = '21f13cda43d3'
branch_labels = None
depends_on = None

def upgrade():
    # SQLite doesn't support DROP COLUMN directly, so recreate the table
    with op.batch_alter_table("reviews") as batch_op:
        batch_op.drop_column("is_hidden")

def downgrade():
    with op.batch_alter_table("reviews") as batch_op:
        batch_op.add_column(sa.Column("is_hidden", sa.Boolean(), nullable=True, default=False))